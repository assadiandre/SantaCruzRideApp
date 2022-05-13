import { useState } from 'react';
import {
  Button,
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  ButtonToolbar,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from 'react-bootstrap';

const FeedPageHeader = ({ value, handleChange }) => {
  // const [value, setValue] = useState([1, 7]);
  // const handleChange = (val) => setValue(val);

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
              align="end"
              id="dropdown-menu"
              title="Match Route"
            >
              <Dropdown.Item>
                <Container>
                  <Row>
                    <Col>
                      <b> Route #1</b>
                    </Col>
                    <Col>M W F</Col>
                  </Row>
                  <Row>
                    <Col>To Campus</Col>
                  </Row>
                  <Row>
                    <Col>11:30 AM</Col>
                  </Row>
                </Container>
                <hr style={{ color: '#DC3545' }} />
              </Dropdown.Item>
              <Dropdown.Item>
                <Container>
                  <Row>
                    <Col>
                      <b> Route #2</b>
                    </Col>
                    <Col>M W F</Col>
                  </Row>
                  <Row>
                    <Col>To Campus</Col>
                  </Row>
                  <Row>
                    <Col>11:30 AM</Col>
                  </Row>
                </Container>
                <hr style={{ color: '#DC3545' }} />
              </Dropdown.Item>
              <Dropdown.Item>
                <Container>
                  <Row>
                    <Col>
                      <b> Route #3</b>
                    </Col>
                    <Col>M W F</Col>
                  </Row>
                  <Row>
                    <Col>To Campus</Col>
                  </Row>
                  <Row>
                    <Col>11:30 AM</Col>
                  </Row>
                </Container>
                <hr style={{ color: '#DC3545' }} />
              </Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
        <Row>
          {/* <ToggleButtonGroup
            className="p-1"
            type="checkbox"
            value={value}
            onChange={handleChange}
          >
            <ToggleButton variant="secondary" id="tbg-btn-1" value={1}>
              Mon
            </ToggleButton>
            <ToggleButton variant="secondary" id="tbg-btn-2" value={2}>
              Tue
            </ToggleButton>
            <ToggleButton variant="secondary" id="tbg-btn-3" value={3}>
              Wed
            </ToggleButton>
            <ToggleButton variant="secondary" id="tbg-btn-4" value={4}>
              Thu
            </ToggleButton>
            <ToggleButton variant="secondary" id="tbg-btn-5" value={5}>
              Fri
            </ToggleButton>
            <ToggleButton variant="secondary" id="tbg-btn-6" value={6}>
              Sat
            </ToggleButton>
            <ToggleButton variant="secondary" id="tbg-btn-7" value={7}>
              Sun
            </ToggleButton>
          </ToggleButtonGroup> */}
        </Row>
      </Container>
    </div>
  );
};

export default FeedPageHeader;
