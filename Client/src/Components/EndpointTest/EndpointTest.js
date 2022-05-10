import React from 'react';
import axios from 'axios';
// import { myContext } from '../../Context';

export default function EndpointTest() {
  //   const userObject = useContext(myContext);

  const accountSetup = () => {
    axios
      .put(
        'http://localhost:3001/account/setup',
        {
          setupFlag: true,
          userType: 'rider',
          phoneNumber: '(123) 456-1234',
          bio: 'hello asbdasjhbdsahjkbdk',
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          //   setUserObject(res.data);
        }
      });
  };

  const editRoutes = () => {
    axios
      .put(
        'http://localhost:3001/account/addroute',
        {
          routes: [
            {
              toCampus: true,
              days: [1, 3, 7],
              time: new Date(),
              offCampusLocation: '123 Sesame Street',
              campusLocation: 'College Nine/Ten',
            },
            {
              toCampus: false,
              days: [2, 4, 6],
              time: new Date(),
              offCampusLocation: '321 Bob Street',
              campusLocation: 'Science Hill',
            },
          ],
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          //   setUserObject(res.data);
        }
      });
  };

  const editRoutes2 = () => {
    axios
      .put(
        'http://localhost:3001/account/addroute',
        {
          routes: [
            {
              toCampus: true,
              days: [1, 3, 4, 7],
              time: new Date(),
              offCampusLocation: 'Mc Donalds',
              campusLocation: 'Cowell College',
            },
            {
              toCampus: false,
              days: [2, 4, 5],
              time: new Date(),
              offCampusLocation: 'Walmart',
              campusLocation: 'Oakes College',
            },
          ],
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          //   setUserObject(res.data);
        }
      });
  };

  return (
    <div>
      Test Setup Endpoint
      <button onClick={editRoutes}>
        <p>Changes Routes to first Array</p>
      </button>
      <button onClick={editRoutes2}>
        <p>Changes Routes to second Array</p>
      </button>
    </div>
  );
}
