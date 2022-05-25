import FeedSingle from './FeedSingle';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { myContext } from '../../Context';
import { convertDays, convertHMS } from './FeedPageUtils';

const FeedPage = () => {
  const [feeds, setFeeds] = useState([]);
  const [user, setUser] = useContext(myContext);
  const [routeIndex, setRouteIndex] = useState(0);

  useEffect(() => {
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
            setFeeds(res.data);
          }
        });
    };
    feedFill();
  }, [routeIndex]);

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
      {feeds.map((feed) => (
        <FeedSingle key={feed._id} feed={feed}></FeedSingle>
      ))}
    </div>
  );
};

export default FeedPage;
