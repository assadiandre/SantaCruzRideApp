import { Col, DropdownButton, Dropdown, Row, Container } from 'react-bootstrap';
import { convertDays, convertHMS } from './FeedPageUtils';

export default function FeedPageRouteDropdown(props) {
  const { user, routeIndex, setRouteIndex } = props;
  const routes = user.routes;

  if (routes.length) {
    return (
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
                    <Col>{route.toCampus ? 'To UCSC' : 'Leaving UCSC'}</Col>
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
    );
  }
}
