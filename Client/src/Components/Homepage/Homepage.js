import React, { useContext } from 'react';
import { myContext } from '../../Context';

export default function Homepage() {
  const context = useContext(myContext);
  return (
    <div>
      {context ? (
        <h1>Welcome back, {context.username}!</h1>
      ) : (
        <h1>Welcome! Please sign up or log in!</h1>
      )}
    </div>
  );
}
