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
          phoneNumber: '(123) 456-9999',
          bio: 'hello asbdasjhbdsahjkbdk',
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data) {
          //   console.log(res);
          //   setUserObject(res.data);
        }
      });
  };

  return (
    <div>
      Test Setup Endpoint
      <div onClick={accountSetup}>
        <p>Click me</p>
      </div>
    </div>
  );
}
