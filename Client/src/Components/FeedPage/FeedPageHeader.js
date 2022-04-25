import React from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  ButtonToolbar,
  ButtonGroup,
} from 'react-bootstrap';

const FeedPageHeader = () => {
  return (
    <div>
      <Container className="bg-danger pt-2 p-3 text-light">
        <Row>
          <Col xs={5}>
            <h1>
              <b>All Drivers</b>
            </h1>
          </Col>
          <Col>
            <DropdownButton
              variant="danger"
              id="dropdown-basic-button"
              title="To Campus"
            >
              <Dropdown.Item>To Home</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          <ButtonToolbar className="p-1">
            <ButtonGroup>
              <Button variant="dark">Mon</Button>
              <Button variant="light">Tue</Button>
              <Button variant="dark">Wed</Button>
              <Button variant="light">Thu</Button>
              <Button variant="dark">Fri</Button>
              <Button variant="light">Sat</Button>
              <Button variant="light">Sun</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Row>
      </Container>
    </div>
  );
};

export default FeedPageHeader;
