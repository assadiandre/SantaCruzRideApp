import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';

const FeedPageHeader = ({ value, handleChange, user }) => {
  function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - hours * 3600) / 60); // get minutes
    let seconds = sec - hours * 3600 - minutes * 60; //  get seconds
    // add 0 if value < 10; Example: 2 => 02

    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hours < 12) {
      return hours + ':' + minutes + ' AM';
    }

    hours = Math.abs(12 - hours);
    return hours + ':' + minutes + ' PM'; // Return is HH : MM
  }

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
                          <b>{route.days.map((day) => convertDays(day))}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {route.toCampus ? 'To Campus' : 'From Campus'}
                        </Col>
                      </Row>
                      <Row>
                        <Col>{convertHMS(route.time)}</Col>
                      </Row>
                    </Container>
                    <hr style={{ color: '#DC3545' }} />
                  </Dropdown.Item>
                ))}
            </DropdownButton>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </div>
  );
};

export default FeedPageHeader;
