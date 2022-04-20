import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { Card, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useCallback } from 'react';

function getLocalAuth() {
  const potentialAuth = localStorage.getItem('auth');
  if (potentialAuth === 'true') {
    return true;
  } else {
    return false;
  }
}

export default function Homepage() {
  const context = useContext(myContext);
  const auth = getLocalAuth();
  const navigate = useNavigate();

  // use effect called when component is rendered or when args are true
  useEffect(() => {
    if (auth) {
      if (context !== null) {
        // If the user object is not null and setup is already true,
        // then redirect to list page

        // Otherwise redirect to setup page
        navigate('/setup');
      }
    }
  }, [context]);

  const googleLogin = () => {
    // open google window with your accounts
    window.open('http://localhost:3001/auth/google', '_self');
    localStorage.setItem('auth', 'true');
  };

  return (
    <div>
      <Card border="danger" className="text-center mt-5 mx-auto w-75">
        <Card.Header>Santa Cruz Ride App</Card.Header>
        <Card.Body>
          <Card.Title>Welcome</Card.Title>
          <Card.Text>Click below to Log in or Sign up!</Card.Text>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button variant="outline-danger" onClick={googleLogin}>
              Log in
            </Button>
            <Button className="mb-3" variant="danger" onClick={googleLogin}>
              Sign up
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}
