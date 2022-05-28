import React from 'react';
// import styles from './NavBar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../../UserContext';
import logo from '../../assets/scraLogo.png';
import styles from './NavBar.module.css';

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

export default function NavBar() {
  const [userObject, setUserObject] = useUser();
  const navigate = useNavigate();
  const navbarColor = userObject ? 'danger' : 'light';
  const textColor = userObject ? 'text-light' : 'text-dark';

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

  const moveToSchedule = () => {
    navigate('/schedule');
  };

  const moveToFeed = () => {
    navigate('/feed');
  };

  return (
    <div>
      <Navbar className={styles.navbarHeight} bg={navbarColor} variant="dark">
        <Container>
          <Link to={'/'}>
            <img src={logo} width="65" height="45" alt="" />
          </Link>
          <Navbar.Toggle />
          <Nav className="me-auto">
            <Nav.Link className={textColor} as={Link} to="/">
              <b>SCcarpool</b>
            </Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {userObject ? (
              <Nav>
                <NavDropdown
                  title={
                    <b className={textColor}>{`Hi, ${userObject.username}`}</b>
                  }
                  id="navbarScrollingDropdown"
                >
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  <NavDropdown.Item onClick={moveToProfile}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={moveToSchedule}>
                    Schedule
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={moveToFeed}>Feed</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Navbar.Text className={textColor}>
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
