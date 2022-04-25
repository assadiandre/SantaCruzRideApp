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
      // currently backwards just so i can code
      if (context && !context.setupFlag) {
        navigate('/feed');
      } else if (context && context.setupFlag) {
        navigate('/setup');
      } else {
        navigate('/');
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
        <Card.Body>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button
              className="mt-2"
              variant="outline-danger"
              onClick={googleLogin}
            >
              SIGNUP
            </Button>
            <Button className="mb-2" variant="danger" onClick={googleLogin}>
              LOGIN
            </Button>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
}
