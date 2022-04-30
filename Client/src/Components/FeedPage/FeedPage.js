import FeedSingle from '../FeedSingle/FeedSingle';
import FeedPageHeader from './FeedPageHeader';
import { useState } from 'react';

const FeedPage = () => {
  // putting state of buttons in parent so we can use it for sorting
  const [value, setValue] = useState([1, 3, 5]); // array of 'on' buttons; def to M W F
  const handleChange = (val) => setValue(val); // flip flop buttons in that array

  return (
    <div>
      <FeedPageHeader
        value={value}
        handleChange={handleChange}
      ></FeedPageHeader>
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
