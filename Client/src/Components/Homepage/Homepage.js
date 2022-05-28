import React from 'react';
import { useUser } from '../../UserContext';
import { Card, Button, Stack, Container, Row, Col } from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './Homepage.module.css';

import {
  BsPencilSquare,
  BsFillPinMapFill,
  BsFillCalendarDayFill,
} from 'react-icons/bs';

function getLocalAuth() {
  const potentialAuth = localStorage.getItem('auth');
  if (potentialAuth === 'true') {
    return true;
  } else {
    return false;
  }
}

export default function Homepage() {
  const [userObject, setUserObject] = useUser();
  const auth = getLocalAuth();
  const navigate = useNavigate();

  // use effect called when component is rendered or when args are true
  useEffect(() => {
    if (auth) {
      if (userObject && !userObject.setupFlag) {
        navigate('/setup');
      } else if (userObject && userObject.setupFlag) {
        navigate('/feed');
      } else {
        navigate('/');
      }
    }
  }, [userObject]);

  const googleLogin = () => {
    // open google window with your accounts
    window.open('http://localhost:3001/auth/google', '_self');
    localStorage.setItem('auth', 'true');
  };

  return (
    <div className={`bg-danger pb-5 ${styles.homepage_height}`}>
      <Container className="pt-4 px-4 pb-3 text-light">
        <Row>
          <h1>
            <b>CARPOOL TO</b>
          </h1>
        </Row>
        <Row>
          <h1>
            <b>AND FROM</b>
          </h1>
        </Row>
        <Row>
          <h1>
            <b>UCSC CAMPUS</b>
          </h1>
        </Row>
      </Container>
      <Card
        border="danger"
        className="text-center mt-5 mb-5 mx-auto w-75 pt-2 pb-2 bg-danger"
      >
        <Card.Body>
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button
              className="mt-2"
              variant="dark"
              size="lg"
              onClick={googleLogin}
            >
              SIGNUP
            </Button>
            <Button
              className="mb-2"
              variant="light"
              size="lg"
              onClick={googleLogin}
            >
              LOGIN
            </Button>
          </Stack>
        </Card.Body>
      </Card>
      <Container className="text-left mt-5 mx-auto px-5 pt-5 pb-5">
        <Row className="pb-2">
          <Col className="col-auto">
            <BsPencilSquare color={'white'} size={45}></BsPencilSquare>
          </Col>
          <Col className="d-flex align-items-center">
            <h5 className="text-light">1. Sign up as a rider or driver</h5>
          </Col>
        </Row>
        <Row className="pb-2">
          <Col className="col-auto">
            <BsFillCalendarDayFill
              color={'white'}
              size={45}
            ></BsFillCalendarDayFill>
          </Col>
          <Col className="d-flex align-items-center">
            <h5 className="text-light">2. Input your weekly schedule</h5>
          </Col>
        </Row>
        <Row>
          <Col className="col-auto">
            <BsFillPinMapFill color={'white'} size={45}></BsFillPinMapFill>
          </Col>
          <Col className="d-flex align-items-center">
            <h5 className="text-light">
              3. Match with students going the same route at the same time
            </h5>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
