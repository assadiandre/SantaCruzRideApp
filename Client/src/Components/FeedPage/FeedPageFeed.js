import FeedSingle from './FeedSingle';
import { Alert, Container } from 'react-bootstrap';

export default function FeedPageFeed(props) {
  const { feeds } = props;

  if (feeds.length > 0) {
    return feeds.map((feed) => (
      <FeedSingle key={feed._id} feed={feed}></FeedSingle>
    ));
  } else {
    return (
      <Container className="mt-5 w-75 ">
        <Alert className="shadow" variant="secondary ">
          <h5>Nothing here yet 😔</h5>
          <p>
            Either add more routes to your schedule or wait for more people to
            add to their schedule.
          </p>
        </Alert>
      </Container>
    );
  }
}
