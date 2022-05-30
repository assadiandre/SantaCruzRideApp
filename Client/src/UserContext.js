import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';

const UserContext = createContext({});
export default function UserContextProvider(props) {
  const [userObjectRequest, setUserObjectRequest] = useState({
    data: null,
    status: null,
  });
  const userObject = userObjectRequest.data;

  function setUserObject(obj) {
    setUserObjectRequest({ data: obj, status: userObjectRequest.status });
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/getuser', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUserObjectRequest({ data: res.data, status: 'success' });
        } else {
          setUserObjectRequest({ data: null, status: 'success' });
        }
      })
      .catch((error) => {
        setUserObjectRequest({ data: null, status: 'error' });
      });
  }, []);

  if (userObjectRequest.status === 'success') {
    return (
      <UserContext.Provider value={[userObject, setUserObject]}>
        {props.children}
      </UserContext.Provider>
    );
  }
}

export const useUser = () => useContext(UserContext);
