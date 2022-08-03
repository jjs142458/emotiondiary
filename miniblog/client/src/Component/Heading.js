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
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: "24px" }}>
          I'm SoSorry's blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ fontSize: "17px", paddingTop: "11px" }}
          >
            <Nav.Link as={Link} to="/">
              home
            </Nav.Link>
            <Nav.Link as={Link} to="/upload">
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
            fontSize: "17px",
            paddingTop: "11px",
          }}
        >
          {user.accessToken === "" ? (
            <Nav.Link as={Link} to="/login">
              login
            </Nav.Link>
          ) : (
            <Navbar.Text
              style={{
                cursor: "pointer",
              }}
              onClick={LoginOutHandler}
            >
              Logout
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Heading;
