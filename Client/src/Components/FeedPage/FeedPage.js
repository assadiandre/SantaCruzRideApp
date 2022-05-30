import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useUser } from '../../UserContext';
import FeedPageRouteDropdown from './FeedPageRouteDropdown';
import FeedPageFeed from './FeedPageFeed';

const FeedPage = () => {
  const [feedRequest, setFeedRequest] = useState({
    data: null,
    status: null,
  });
  const feeds = feedRequest.data;
  const [user, setUser] = useUser();
  const [routeIndex, setRouteIndex] = useState(0);

  useEffect(() => {
    setFeedRequest({ data: null, status: 'pending' });
    const feedFill = () => {
      axios
        .get('http://localhost:3001/feed/fill', {
          withCredentials: true,
          params: {
            route_index: routeIndex,
          },
        })
        .then((res) => {
          if (res.data) {
            setFeedRequest({ data: res.data, status: 'success' });
          }
        });
    };
    feedFill();
  }, [routeIndex]);

  if (feeds == null || feedRequest.status === 'pending') {
    return (
      <div className="d-flex h-100 justify-content-center align-items-center">
        <div className="d-flex flex-column align-items-center">
          <Spinner animation="grow" variant="danger" size="lg" />
          <p> Loading Feed... </p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Container className="bg-danger pt-2 p-3 text-light">
          <Row>
            <Col xs={8}>
              <h1>
                <b>
                  {user && user.userType === 'Rider'
                    ? 'All Drivers 🛻'
                    : 'All Riders 🙋‍♂️'}
                </b>
              </h1>
            </Col>
            <Col className="d-flex justify-content-end me-3">
              <FeedPageRouteDropdown
                user={user}
                routeIndex={routeIndex}
                setRouteIndex={setRouteIndex}
              />
            </Col>
          </Row>
        </Container>
        <FeedPageFeed feeds={feeds} />
      </div>
    );
  }
};

export default FeedPage;
