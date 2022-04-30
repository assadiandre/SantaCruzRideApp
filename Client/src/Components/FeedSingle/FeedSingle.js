import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FeedSingle = ({ name, dest, time }) => {
  return (
    <div>
      <Container className="shadow p-3 mb-1 bg-white rounded">
        <Row>
          <Col xs={8}>
            <h5>
              <b>{name}</b>
            </h5>
          </Col>
          <Col>
            <Row>
              <b>M W F</b>
            </Row>
            <Row>
              <b>{time}</b>
            </Row>
            <Row>
              <b>To Campus</b>
            </Row>
          </Col>
        </Row>
        <Row className="text-muted">
          <Col>Start: 0.3 Miles From You</Col>
        </Row>
        <Row className="text-muted">
          <Col>Destination: {dest}</Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeedSingle;
