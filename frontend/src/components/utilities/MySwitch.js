import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import AllUsers from "../../pages/AllUsers";
import UserRegistration from "../../pages/UserRegistration";
import Login from "../../pages/Login";
import About from "../../pages/About";
import Contact from "../../pages/Contact";
import UpdateUser from "../../pages/UpdateUser";
import Home from "../../pages/Home";
export default function MySwitch() {
  return (
    <div>
      <Container className="min-vh-100">
        {/* displaying all the routes */}
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/login" element={<Login />} exact />
          <Route path="/about" element={<About />} exact />
          <Route path="/contact" element={<Contact />} exact />
          <Route path="/UpdateUser/:id" element={<UpdateUser />} exact />
          <Route path="/users" element={<AllUsers />} exact />
          <Route path="/register" element={<UserRegistration />} exact />
        </Routes>
      </Container>
    </div>
  );
}
