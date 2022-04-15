import React from 'react';
import googleImage from '../../assets/googleImage.png';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const googleLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginForm}>
        <h1>Login/Signup</h1>
        <div className={styles.googleContainer} onClick={googleLogin}>
          <img src={googleImage} alt="Google Icon" />
          <p>Login/Signup with Google</p>
        </div>
      </div>
    </div>
  );
}
