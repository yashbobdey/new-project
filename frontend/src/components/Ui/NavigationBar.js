import React from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Offcanvas, NavDropdown } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";
export default function NavigationBar() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    // <Navbar bg="dark" variant="dark">
    //   <Container fluid>
    //     <Navbar.Brand as={Link} to="/">
    //       INFO
    //     </Navbar.Brand>
    //     <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    //     <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav
    //         className="me-auto my-2 my-lg-0"
    //         style={{ maxHeight: "100px" }}
    //         navbarScroll
    //       >
    //         <Nav.Link as={Link} to="/">
    //           Home
    //         </Nav.Link>

    //         <Nav.Link as={Link} to="/users">
    //           Users
    //         </Nav.Link>

    //         <Nav.Link as={Link} to="/about">
    //           About
    //         </Nav.Link>
    //         <Nav.Link as={Link} to="/contact">
    //           Contact
    //         </Nav.Link>
    //       </Nav>
    //       {isLoggedIn && (
    //         <Button variant="outline-danger" onClick={logoutHandler}>
    //           LogOut
    //         </Button>
    //       )}
    //       {!isLoggedIn && (
    //         <Button
    //           variant="primary"
    //           onClick={() => {
    //             navigate("/login");
    //           }}
    //         >
    //           LogIn
    //         </Button>
    //       )}
    //     </Navbar.Collapse>
    //   </Container>
    // </Navbar>
    // <div>
    //   <Navbar bg="dark" variant="dark" expand="lg">
    //     <Navbar.Brand as={Link} to="/">
    //       <div>
    //         <strong>INFO..</strong>
    //       </div>
    //     </Navbar.Brand>

    //     <Navbar.Toggle
    //       aria-controls="basic-navbar-nav"
    //       className="text-white"
    //     />
    //     <Navbar.Collapse id="basic-navbar-nav" className="text-white">
    //       <Nav className="mr-auto">
    //         <Nav.Link as={Link} to="/">
    //           Home
    //         </Nav.Link>
    //         <Nav.Link as={Link} to="/users">
    //           Users
    //         </Nav.Link>
    //         <Nav.Link as={Link} to="/about">
    //           About Us
    //         </Nav.Link>
    //         <Nav.Link as={Link} to="/contact">
    //           Contact Us
    //         </Nav.Link>
    //       </Nav>

    //       <Nav className="mr-sm-2">
    //         {/* <Nav className="my-auto"> */}
    //         {isLoggedIn && (
    //           <Dropdown>
    //             <Dropdown.Toggle
    //               className="mx-2 border-0"
    //               variant="outline-grey"
    //               size="sm"
    //               id="basic-nav-dropdown"
    //             >
    //               <img
    //                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrkJCZAdC8LXWluGqUg1zStm5JXhnkKgUwvw&usqp=CAU"
    //                 alt="mdo"
    //                 width="35"
    //                 height="35"
    //                 className="rounded-circle"
    //               ></img>
    //             </Dropdown.Toggle>

    //             <Dropdown.Menu>
    //               <Dropdown.Item>
    //                 <Button variant="danger" onClick={logoutHandler}>
    //                   Logout
    //                 </Button>
    //               </Dropdown.Item>
    //             </Dropdown.Menu>
    //           </Dropdown>
    //         )}
    //         {!isLoggedIn && (
    //           <Button
    //             onClick={() => {
    //               navigate("/login");
    //             }}
    //             variant="warning"
    //             className=" navbar-right text-light mx-2 my-1 "
    //             // size="lg"
    //           >
    //             Login
    //           </Button>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    // </div>
    <Navbar bg="dark" variant="dark" expand={false}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          INFO..
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">MENU</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={Link} to="/users">
                Users
              </Nav.Link>

              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact">
                Contact
              </Nav.Link>
              <NavDropdown title="Account" id="offcanvasNavbarDropdown">
                {isLoggedIn && (
                  <NavDropdown.Item href="#action4">
                    <Button variant="outline-danger" onClick={logoutHandler}>
                      LogOut
                    </Button>
                  </NavDropdown.Item>
                )}
                {!isLoggedIn && (
                  <NavDropdown.Item href="#action4">
                    <Button
                      variant="outline-warning"
                      onClick={() => {
                        navigate("/login");
                      }}
                    >
                      LogIn
                    </Button>
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
