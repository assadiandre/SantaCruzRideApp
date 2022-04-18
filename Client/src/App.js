// import logo from './logo.svg';
import './App.css';
// import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import NavBar from './Components/NavBar/NavBar';
import './GlobalStyles.css';
import { useContext } from 'react';
import { myContext } from './Context';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap stylesheet

function App() {
  const userObject = useContext(myContext);
  console.log(userObject);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        {/* Hide login page from users that are already logged in. */}
        {userObject ? null : <Route path="/login" element={<LoginPage />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
