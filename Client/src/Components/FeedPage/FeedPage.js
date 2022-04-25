import FeedSingle from '../FeedSingle/FeedSingle';
import FeedPageHeader from './FeedPageHeader';

const FeedPage = () => {
  return (
    <div>
      <FeedPageHeader></FeedPageHeader>
      <FeedSingle
        name={'Jason O.'}
        dest={'Cowell College'}
        time={'11:30AM'}
      ></FeedSingle>
      <FeedSingle
        name={'Fernando M.'}
        dest={'JRL College'}
        time={'9:15AM'}
      ></FeedSingle>
      <FeedSingle
        name={'LeBron J.'}
        dest={'Rachel Carson College'}
        time={'2:00PM'}
      ></FeedSingle>
      <FeedSingle
        name={'Andre A.'}
        dest={'Oaks College'}
        time={'10:05AM'}
      ></FeedSingle>
    </div>
  );
};

export default FeedPage;
