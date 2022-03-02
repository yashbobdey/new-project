import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers, deleteUser } from "../actions/userActions";
import { logout } from "../actions/userActions";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router";

export default function AllUsers() {
  const [pageNumber, setPageNumber] = useState(0);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers(pageNumber, keyword));
  }, [dispatch, pageNumber, keyword]);

  const users = useSelector((state) => state.user.users);
  const totalPages = useSelector((state) => state.user.totalPages);

  const pages = new Array(totalPages).fill(null).map((v, i) => i);

  console.log("totalPages:", totalPages);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loggedInUserID = localStorage.getItem("user_id");
  console.log(users);
  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
    alert("Record deleted Successfully!!");
    dispatch(logout());
    navigate("/login");
  };
  const editHandler = (id) => {
    navigate(`/UpdateUser/${id}`);
  };

  const goToPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const goToNext = () => {
    setPageNumber(Math.min(totalPages - 1, pageNumber + 1));
  };

  let usersList = [];

  usersList = users.map((user, i) => {
    return (
      <tr key={user._id}>
        <td>{i + 1}</td>
        <td>{user.userName}</td>
        <td>{user.gender}</td>
        <td>{user.userInterest}</td>
        <td>{user.generalDescription}</td>
        {user._id === loggedInUserID && (
          <td>
            <button
              onClick={() => {
                editHandler(user._id);
              }}
            >
              <i class="fas fa-edit"></i>
            </button>{" "}
            <button
              onClick={() => {
                deleteHandler(user._id);
              }}
              className="mt-2"
            >
              <i class="fas fa-trash "></i>{" "}
            </button>
          </td>
        )}
      </tr>
    );
  });
  return (
    <div>
      {!isLoggedIn && (
        <Container>
          <h3>You must Login to see/edit the users </h3>
          <Button onClick={() => navigate("/login")}>Go to Login Page</Button>
        </Container>
      )}{" "}
      {isLoggedIn && <h3>Page {pageNumber + 1}</h3>}
      {isLoggedIn && (
        <div>
          <Row className="justify-content-md-center">
            <Col md={4}>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">
                  <i className="fas fa-search fa-1x"></i>
                </InputGroup.Text>
                <FormControl
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  placeholder="search by 'username' or 'interest'"
                  onChange={(event) => {
                    setKeyword(event.target.value);
                  }}
                />
              </InputGroup>
            </Col>
          </Row>
          <Table striped bordered hover responsive="md" className="mt-2">
            <thead>
              <tr>
                <th>No.</th>
                <th>User-Name</th>
                <th>Gender</th>
                <th>Interest</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{usersList}</tbody>
          </Table>
          <Container>
            <Row className="justify-content-md-center">
              <Col md="4">
                <button onClick={goToPrevious}>previous</button>
                {pages.map((pageIndex) => (
                  <button
                    key={pageIndex}
                    onClick={() => setPageNumber(pageIndex)}
                  >
                    {pageIndex + 1}
                  </button>
                ))}
                <button onClick={goToNext}>next</button>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}
