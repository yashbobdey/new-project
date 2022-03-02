import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col, Toast } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../actions/userActions";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginError = useSelector((state) => state.user.loginError);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  useEffect(() => {
    isLoggedIn && navigate("/");

    loginError && setShow(true);
  }, [isLoggedIn, loginError, navigate]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm(); //react-hook-form

  watch("userName");
  watch("password");
  //------------------------------------------------ #1 ------------------
  const submitHandler = (data) => {
    console.log("on submit data: ", data);
    dispatch(login(data)); //dispatching login request
  };

  //---------------------- Error handling ----------------
  const [show, setShow] = useState(false);

  const changeShow = () => setShow(false);
  return (
    <Container className="my-5">
      <Row md="4" className="justify-content-md-center">
        {/* {loginError && <h1 className="text-danger">{loginError}</h1>} */}

        <Col xs="6">
          <Toast
            show={show}
            onClose={changeShow}
            className="mb-3 border-danger"
          >
            <Toast.Header className="bg-danger text-white justify-content-between">
              <strong className="me-auto">Login Error</strong>
            </Toast.Header>
            <Toast.Body>{loginError}</Toast.Body>
          </Toast>
        </Col>
      </Row>
      {/* <--------Login form----------> */}
      <Row md="4" className="justify-content-md-center">
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Form.Group controlId="formBasicText">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              {...register("userName", {
                required: "username is required",
              })}
            />
            <Form.Text className="text-danger">
              {errors.uname && errors.uname.message}{" "}
              {/* form validation error */}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
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
              {errors.password && errors.password.message}{" "}
              {/* form validation error */}
            </Form.Text>
          </Form.Group>

          <Button className="mt-3" variant="warning" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={5}>
          <p className="mt-5">
            Don't have an account?{" "}
            <Link to="/register">Register for a new account</Link>{" "}
            {/* register for new user */}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
