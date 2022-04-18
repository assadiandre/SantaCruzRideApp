import React, { useContext } from 'react';
// import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { myContext } from '../../Context';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
  const userObject = useContext(myContext);

  const logout = () => {
    axios
      .get('http://localhost:3001/auth/logout', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === 'Logout successful') {
          window.location.href = '/';
        }
      });
  };

  return (
    <div className={''}>
      {/* <ul className={styles.navBar}>
        <li>
          <Link to="/">Home</Link>
        </li> */}
      {/* Display Login button if user not logged in, display Logout button if user logged in already. */}
      {/* {userObject ? (
          <li onClick={logout}>Logout</li>
        ) : (
          <li>
            <Link to="/login">Login/Signup</Link>
          </li>
        )}
      </ul> */}

      <Navbar bg="danger" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">
            SCRA
          </Navbar.Brand>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">
              About
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {userObject ? (
              <Nav>
                <NavDropdown
                  title={`Hi, ${userObject.username}`}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Navbar.Text>Not signed in...</Navbar.Text>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
