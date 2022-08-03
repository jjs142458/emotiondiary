import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import firebase from "../firebase.js";

function Heading() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const LoginOutHandler = () => {
    firebase.auth().signOut();
    navigate("/", { replace: true });
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      variant="white"
      style={{ borderBottom: "1px solid #ddd", paddingBottom: "11px" }}
    >
      <Navbar.Brand
        href="/"
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginLeft: "100px",
        }}
      >
        I'm SoSorry's blog
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className="me-auto"
          style={{ fontSize: "20px", paddingTop: "11px" }}
        >
          <Nav.Link as={Link} to="/" style={{ paddingLeft: "20px" }}>
            home
          </Nav.Link>
          <Nav.Link as={Link} to="/upload" style={{ paddingLeft: "20px" }}>
            upload
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse
        className="justify-content-end"
        style={{
          color: "dark",
          textDecoration: "none",
          cursor: "pointer",
          fontSize: "20px",
          paddingTop: "7px",
          paddingLeft: "20px",
          marginRight: "110px",
        }}
      >
        {user.accessToken === "" ? (
          <Nav.Link as={Link} to="/login">
            Login
          </Nav.Link>
        ) : (
          <Navbar.Text onClick={LoginOutHandler} style={{ color: "black" }}>
            Logout
          </Navbar.Text>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Heading;
