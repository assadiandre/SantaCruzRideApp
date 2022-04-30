// import logo from './logo.svg';
import './App.css';
// import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import AccountSetup from './Components/AccountSetup/AccountSetup';
import NavBar from './Components/NavBar/NavBar';
import './GlobalStyles.css';
import { useContext } from 'react';
import { myContext } from './Context';
import EndpointTest from './Components/EndpointTest/EndpointTest';
import FeedPage from './Components/FeedPage/FeedPage';

import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap stylesheet

function App() {
  const userObject = useContext(myContext);
  console.log('rendering from app', userObject);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* if userobj does not exist -> when on path="/" show homepage  else if userobj 
        exists -> when on path="/setup" show __*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/setup" element={<AccountSetup />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/test" element={<EndpointTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
