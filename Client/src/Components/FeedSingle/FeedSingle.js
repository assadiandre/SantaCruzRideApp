import { Container, Row, Col, Collapse } from 'react-bootstrap';
import { useState } from 'react';

const FeedSingle = ({ feed, dest, time }) => {
  const [open, setOpen] = useState(false);

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
    // convert numberical days to letters
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

  function existingRoutes() {
    // a feed has a routes array
    if (feed && Array.isArray(feed.routes) && feed.routes.length) return true;
  }

  function existingOffCampus() {
    // if the feed has an updated offcampus that exists
    if (
      feed.routes[0].offCampusLocation !== undefined &&
      feed.routes[0].offCampusLocation !== null &&
      Object.keys(feed.routes[0].offCampusLocation).length !== 0
    )
      return true;
  }

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
              <b>
                {existingRoutes()
                  ? feed.routes[0].days.map((day) => convertDays(day))
                  : 'M W F'}
              </b>
              {/* <b>M W F</b> */}
            </Row>
            <Row>
              <b>
                {existingRoutes() ? convertHMS(feed.routes[0].time) : '4:20PM'}
              </b>
            </Row>
            <Row>
              <b>
                {existingRoutes() && feed.routes[0].toCampus
                  ? 'To Campus'
                  : 'From Campus'}
              </b>
            </Row>
          </Col>
        </Row>
        <Row className="text-muted">
          <Col>Start: 0.3 Miles From You</Col>
        </Row>
        <Row className="text-muted">
          <Col>
            Destination:{' '}
            {/* rn only displaying destinations off campus, not showing any dest to campus */}
            {existingRoutes() && existingOffCampus()
              ? feed.routes[0].offCampusLocation.address
              : 'College 9/10'}
          </Col>
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
