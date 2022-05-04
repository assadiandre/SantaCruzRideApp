import FeedSingle from '../FeedSingle/FeedSingle';
import FeedPageHeader from './FeedPageHeader';
import { useState, useEffect } from 'react';
import axios from 'axios';

const FeedPage = () => {
  // putting state of buttons in parent so we can use it for sorting
  const [value, setValue] = useState([1, 3, 5]); // array of 'on' buttons; default to M W F
  const handleChange = (val) => setValue(val); // flip flop buttons in that array

  const [feeds, setFeeds] = useState([]);

  // upon every render or change of button values, pull from backend list of feeds
  useEffect(() => {
    const feedFill = () => {
      axios
        .get('http://localhost:3001/feed/fill', { withCredentials: true })
        .then((res) => {
          if (res.data) {
            console.log('res data', res.data);
            console.log('buttons that are on', value);
            setFeeds(res.data);
          }
        });
    };

    feedFill();
  }, [value]);

  return (
    <div>
      <FeedPageHeader
        value={value}
        handleChange={handleChange}
      ></FeedPageHeader>
      {/* loop through list of feeds from backend*/}
      {feeds.map((feed) => (
        <FeedSingle
          key={feed._id}
          feed={feed}
          dest={'Cowell College'}
          time={'11:30AM'}
        ></FeedSingle>
      ))}
    </div>
  );
};

export default FeedPage;
