import React, { useContext } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { myContext } from '../../Context';

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
    <div className={styles.navBarWrapper}>
      <ul className={styles.navBar}>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Display Login button if user not logged in, display Logout button if user logged in already. */}
        {userObject ? (
          <li onClick={logout}>Logout</li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
