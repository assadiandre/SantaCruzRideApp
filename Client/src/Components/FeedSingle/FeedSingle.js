import { Container, Row, Col, Collapse, Button } from 'react-bootstrap';
import { useState } from 'react';

const FeedSingle = ({ feed, dest, time }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container
        className="shadow p-3 mb-1 bg-white rounded"
        onClick={() => setOpen(!open)}
        aria-controls="collapse-text"
        aria-expanded={open}
      >
        <Row>
          <Col xs={8}>
            <h5>
              <b>
                {feed.username} {feed.lastname}
              </b>
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
        <Row>
          <Col className="text-dark">
            <Collapse in={open} className="">
              <div id="collapse-text" className="">
                <hr style={{ color: '#DC3545' }} />
                <Row className="mx-auto">
                  Bio: {feed.bio ? feed.bio : 'No bio to show'}
                </Row>
                <Row className="mx-auto">
                  Phone Number:{' '}
                  {feed.phoneNumber
                    ? feed.phoneNumber.slice(2)
                    : 'No phone number to show'}
                </Row>
                <Row className="mx-auto">
                  Email: {feed.email ? feed.email : 'No email to show'}
                </Row>
              </div>
            </Collapse>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FeedSingle;
