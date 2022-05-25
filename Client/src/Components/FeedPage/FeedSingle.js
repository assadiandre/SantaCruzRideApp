import { Container, Row, Col, Collapse } from 'react-bootstrap';
import { useState } from 'react';
import { convertDays, convertHMS } from './FeedPageUtils';

const FeedSingle = ({ feed }) => {
  const [open, setOpen] = useState(false);

  function existingRoutes() {
    // a feed has a routes array
    if (feed && Array.isArray(feed.routes) && feed.routes.length) return true;
  }

  function existingOffCampus() {
    // check if the feed has the updated offcampus field exists
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
