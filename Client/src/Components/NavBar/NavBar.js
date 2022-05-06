import React, { useContext } from 'react';
// import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { myContext } from '../../Context';
import logo from '../../assets/scraLogo.png';

import { Navbar, Nav, Container, NavDropdown, Image } from 'react-bootstrap';

export default function NavBar() {
  const [userObject, setUserObject] = useContext(myContext);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .get('http://localhost:3001/auth/logout', {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data === 'Logout successful') {
          window.location.href = '/';
          localStorage.setItem('auth', 'false');
        }
      });
  };

  const moveToProfile = () => {
    navigate('/profile');
  };

  return (
    <div>
      <Navbar bg={userObject ? 'danger' : 'light'} variant="dark">
        <Container>
          <Link to={'/'}>
            <img src={logo} width="65" height="45" alt="" />
          </Link>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link
              className={userObject ? 'text-light' : 'text-dark'}
              as={Link}
              to="/"
            >
              <b>SCcarpool</b>
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {userObject ? (
              <Nav>
                <NavDropdown
                  title={<b>{`Hi, ${userObject.username}`}</b>}
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item onClick={moveToProfile}>
                    Profile
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Navbar.Text
                  className={userObject ? 'text-light' : 'text-dark'}
                >
                  Not signed in...
                </Navbar.Text>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
