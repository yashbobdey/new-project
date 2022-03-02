import { useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions/userActions";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { update } from "../actions/userActions";
import { useNavigate } from "react-router";

export default function UpdateUser() {
  const params = useParams();
  const user_id = params.id;
  console.log("params id:", user_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUser(user_id));
  }, [user_id, dispatch]);

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  let user = useSelector((state) => state.user.user);
  console.log("update profile page", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    const updatedUser = {
      userName: data.uname,
      password: user.password,
      email: data.email,
      gender: user.gender,
      generalDescription: data.gendescp,
      userInterest: data.usrintr,
    };
    console.log("inside submit handler", updatedUser);
    dispatch(update(user_id, updatedUser));
    alert("details updated successfully!");
    navigate("/users");
  };
  return (
    <div>
      {!isLoggedIn && (
        <Container>
          <h3>You must Login to see/edit the users </h3>
          <Button onClick={() => navigate("/login")}>Go to Login Page</Button>
        </Container>
      )}
      <div>
        {isLoggedIn && (
          <Container>
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Row className="justify-content-md-center mt-3" md="8">
                <Col md="4">
                  <Form.Group controlId="formGridName">
                    <Form.Label>User-Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter UserName"
                      defaultValue={user.userName}
                      disabled
                      {...register("uname", {})}
                    />
                    <Form.Text className="text-danger">
                      {errors.uname && errors.uname.message}{" "}
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md="4">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Email Id</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      defaultValue={user.email}
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

              <Row className="justify-content-md-center mt-4" md="8">
                <Col md={4}>
                  <Form.Label>General Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Enter General Description"
                    defaultValue={user.generalDescription}
                    //form validation
                    {...register("gendescp")}
                  />
                </Col>
                <Col md={4}>
                  <Form.Label>User Interest</Form.Label>
                  <br />
                  <Form.Select
                    name="usrintr"
                    defaultValue={user.userInterest}
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
                    <option value="Health and Fitness">
                      Health and Fitness
                    </option>
                  </Form.Select>
                  <Form.Text className="text-danger">
                    {errors.usrintr && errors.usrintr.message}
                  </Form.Text>
                </Col>
                <Col md={8} className="mt-3">
                  <Button variant="warning" size="lg" type="submit">
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </div>
    </div>
  );
}
