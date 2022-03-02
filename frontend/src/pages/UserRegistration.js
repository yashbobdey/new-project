import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../actions/userActions";
import { emptyErrors } from "../actions/userActions";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserRegistration() {
  const dispatch = useDispatch();

  const [login, setLogin] = useState(false);
  useEffect(() => {
    dispatch(emptyErrors());
  }, [dispatch]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password", "");

  // watch("password");
  const error = useSelector((state) => state.user.error);
  console.log(error);

  const submitHandler = (data) => {
    //creating new user to save in the database

    const user = {
      userName: data.userName,
      password: data.password,
      email: data.email,
      gender: data.gender,
      userProfile: (data.profpic[0], data.profpic.name),
      generalDescription: data.gendescp,
      userInterest: data.usrintr,
    };
    // console.log("on submit data: ", user);
    // console.log(data.profpic[0]);
    dispatch(registerUser(user));
    !error && setLogin(true);
  };

  return (
    <div>
      <Container>
        {error && (
          <h2 className="text-danger text-center border">
            Username already exists! Please use different username.
          </h2>
        )}{" "}
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Row className="justify-content-md-center mt-3" md="8">
            <Col md="4">
              <Form.Group controlId="formGridName">
                <Form.Label>User-Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter UserName"
                  //form validation
                  {...register("userName", {
                    required: "user-name is required",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.userName && errors.userName.message}{" "}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md="4">
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                      message: "Not a vaild email",
                    },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.email && errors.email.message}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-3" md="8">
            <Col md={4}>
              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "password is required",
                    minLength: { value: 5, message: "Minimum length is 5" },
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.password && errors.password.message}
                </Form.Text>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="formGridPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder=" Confirm Password"
                  {...register("confirm_password", {
                    required: "password is required",
                    validate: (value) =>
                      value === password.current || "Passoword does not match",
                  })}
                />
                <Form.Text className="text-danger">
                  {errors.confirm_password && errors.confirm_password.message}
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-4" md="8">
            <Col md={3}>
              <Form.Label>Gender:</Form.Label>{" "}
              <label>
                <b>M</b>{" "}
              </label>
              <input
                type="radio"
                {...register("gender", { required: "Please select a gender" })}
                value="male"
              />
              {"  "}
              <label>
                <b>F</b>{" "}
              </label>
              <input
                type="radio"
                {...register("gender", { required: "Please select a gender" })}
                value="female"
              />
              <Form.Text className="text-danger">
                {errors.gender && errors.gender.message}
              </Form.Text>
            </Col>
            <Col md={3}>
              <Form.Label>Upload profile pic:</Form.Label>
              <Form.Control
                type="file"
                {...register("profpic", {
                  required: "profile pic is required",
                })}
                accept="image/png,image/jpeg"
              />

              <Form.Text className="text-danger">
                {errors.profpic && errors.profpic.message}
              </Form.Text>
            </Col>
          </Row>
          <Row className="justify-content-md-center mt-4" md="8">
            <Col md={4}>
              <Form.Label>General Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter General Description"
                //form validation
                {...register("gendescp")}
              />
            </Col>
            <Col md={4}>
              <Form.Label>User Interest</Form.Label>
              <br />
              <Form.Select
                name="usrintr"
                {...register("usrintr", {
                  required: "Please select area of Interest",
                })}
              >
                <option value="Sports">Sports</option>
                <option value="News">News</option>
                <option value="Movies">Movies</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Technology">Technology</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Gaming">Gaming</option>
                <option value="Books">Books</option>
                <option value="Health and Fitness">Health and Fitness</option>
              </Form.Select>
              <Form.Text className="text-danger">
                {errors.usrintr && errors.usrintr.message}
              </Form.Text>
            </Col>
            <Col md={8} className="mt-3">
              <Button variant="warning" size="lg" block type="submit">
                Register
              </Button>
            </Col>
          </Row>
          {login && (
            <p className="text-center alreadyRegister mt-3">
              Registration Succesfull ??? <Link to="/login">Log in.</Link>{" "}
              {/* redirecting to login page */}
            </p>
          )}
        </Form>
      </Container>
    </div>
  );
}
