import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { Card, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const context = useContext(myContext);

  const googleLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
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
