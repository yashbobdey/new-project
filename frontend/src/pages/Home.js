import React from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          {isLoggedIn && (
            <h4>
              Please <Link to="/users">click here</Link> to see all users
            </h4>
          )}
          {!isLoggedIn && (
            <h4>
              Please <Link to="/login">Log In</Link> to continue..
            </h4>
          )}
        </Row>
      </Container>
    </div>
  );
}
