import FeedSingle from './FeedSingle';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  DropdownButton,
  Dropdown,
  Spinner,
} from 'react-bootstrap';
import { useUser } from '../../UserContext';
import { convertDays, convertHMS } from './FeedPageUtils';

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
            console.log('res data', res.data);
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
            <Col xs={6}>
              <h1>
                <b>
                  {user && user.userType === 'Rider'
                    ? 'All Drivers 🛻'
                    : 'All Riders 🙋‍♂️'}
                </b>
              </h1>
            </Col>
            <Col className="d-flex justify-content-end me-3">
              <DropdownButton
                variant="danger"
                align="end"
                id="dropdown-menu"
                title={'Match Route #' + (routeIndex + 1) + ' '}
              >
                {user &&
                  user.routes.map((route, index) => (
                    <Dropdown.Item
                      key={index}
                      // use e or blank for param when using onclick since it expects an event
                      onClick={(e) => {
                        setRouteIndex(index);
                      }}
                    >
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
                            {route.toCampus ? 'To UCSC' : 'Leaving UCSC'}
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
        {feeds.map((feed) => (
          <FeedSingle key={feed._id} feed={feed}></FeedSingle>
        ))}
      </div>
    );
  }
};

export default FeedPage;
