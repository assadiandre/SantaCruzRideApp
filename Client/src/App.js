// import logo from './logo.svg';
import './App.css';
// import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import AccountSetup from './Components/AccountSetup/AccountSetup';
import NavBar from './Components/NavBar/NavBar';
import Schedule from './Components/Schedule/Schedule';
import './GlobalStyles.css';
import { useContext } from 'react';
import { myContext } from './Context';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap stylesheet

function App() {
  const userObject = useContext(myContext);
  console.log(userObject);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* if userobj does not exist -> when on path="/" show homepage  else if userobj 
        exists -> when on path="/setup" show __*/}
        <Route path="/" element={<Homepage />} />
        <Route path="/setup" element={<AccountSetup />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
