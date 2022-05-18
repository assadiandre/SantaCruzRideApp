import React from 'react';
import axios from 'axios';
// import { myContext } from '../../Context';

export default function EndpointTest() {
  //   const userObject = useContext(myContext);

  // const accountSetup = () => {
  //   axios
  //     .put(
  //       'http://localhost:3001/account/setup',
  //       {
  //         setupFlag: true,
  //         userType: 'rider',
  //         phoneNumber: '(123) 456-1234',
  //         bio: 'hello asbdasjhbdsahjkbdk',
  //         address: '641 Merrill Road, Santa Cruz',
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data) {
  //         console.log(res.data);
  //         //   setUserObject(res.data);
  //       }
  //     });
  // };

  // const editRoutes = () => {
  //   axios
  //     .put(
  //       'http://localhost:3001/account/addroute',
  //       {
  //         routes: [
  //           {
  //             toCampus: true,
  //             days: [1, 3, 7],
  //             time: new Date(),
  //             offCampusLocation: '517 Cedar Street, Santa Cruz',
  //             campusLocation: '641 Merrill Road, Santa Cruz',
  //           },
  //           {
  //             toCampus: false,
  //             days: [2, 4, 6],
  //             time: new Date(),
  //             offCampusLocation: '2688 Basswood Drive, San Ramon',
  //             campusLocation: '641 Merrill Road, Santa Cruz',
  //           },
  //         ],
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data) {
  //         console.log(res.data);
  //         //   setUserObject(res.data);
  //       }
  //     });
  // const editRoutes2 = () => {
  //   axios
  //     .put(
  //       'http://localhost:3001/account/addroute',
  //       {
  //         routes: [
  //           {
  //             toCampus: true,
  //             days: [1, 3, 4, 7],
  //             time: new Date(),
  //             offCampusLocation: 'Mc Donalds',
  //             campusLocation: 'Cowell College',
  //           },
  //           {
  //             toCampus: false,
  //             days: [2, 4, 5],
  //             time: new Date(),
  //             offCampusLocation: 'Walmart',
  //             campusLocation: 'Oakes College',
  //           },
  //         ],
  //       },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data) {
  //         console.log(res.data);
  //         //   setUserObject(res.data);
  //       }
  //     });
  // };
  const feedFilltest = () => {
    axios
      .get(`http://localhost:3001/feed/fill`, {
        withCredentials: true,
        params: {
          route_index: 0,
        },
      })
      .then((res) => {
        if (res.data) {
          console.log('res data', res.data);
          console.log('res args', res.data.args);
          //console.log('buttons that are on', value);
        }
      });
  };

  return (
    <div>
      {/* <button onClick={accountSetup}>
        <p>Test setup endpoint</p>
      </button>
      <button onClick={editRoutes}>
        <p>Changes Routes to first Array</p>
      </button> */}
      <button onClick={feedFilltest}>
        <p>Logs resulting values from feed/fill</p>
      </button>
    </div>
  );
}
