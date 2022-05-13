import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';

const FeedPageHeader = ({ value, handleChange, user }) => {
  function convertDays(day) {
    var dayString;
    switch (day) {
      case 1:
        dayString = 'M';
        break;
      case 2:
        dayString = 'Tu';
        break;
      case 3:
        dayString = 'W';
        break;
      case 4:
        dayString = 'Th';
        break;
      case 5:
        dayString = 'F';
        break;
      case 6:
        dayString = 'Sa';
        break;
      default:
        dayString = 'Su';
        break;
    }
    return dayString + ' ';
  }

  return (
    <div>
      <Container className="bg-danger pt-2 p-3 text-light">
        <Row>
          <Col xs={5}>
            <h1>
              <b>
                {user && user.userType === 'Rider'
                  ? 'All Drivers'
                  : 'All Riders'}
              </b>
            </h1>
          </Col>
          <Col>
            <DropdownButton
              variant="danger"
              align="end"
              id="dropdown-menu"
              title="Match Route"
            >
              {user &&
                user.routes.map((route, index) => (
                  <Dropdown.Item key={index}>
                    <Container>
                      <Row>
                        <Col>
                          <b> Route #{index + 1}</b>
                        </Col>
                        <Col>
                          {' '}
                          <b>{route.days.map((day) => convertDays(day))}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {route.toCampus ? 'To Campus' : 'From Campus'}
                        </Col>
                      </Row>
                      <Row>
                        <Col>{route.time}</Col>
                      </Row>
                    </Container>
                    <hr style={{ color: '#DC3545' }} />
                  </Dropdown.Item>
                ))}
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
