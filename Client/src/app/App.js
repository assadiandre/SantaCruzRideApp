// import logo from './logo.svg';
import './App.css';
// import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../Components/NavBar/NavBar';
import { useUser } from '../UserContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // bootstrap stylesheet
import UnauthenticatedApp from './UnauthenticatedApp';
import AuthenticatedApp from './AuthenticatedApp';

function App() {
  const [userObject, setUserObject] = useUser();
  let AvailableRoutes;

  if (userObject == null) {
    AvailableRoutes = UnauthenticatedApp;
  } else {
    AvailableRoutes = AuthenticatedApp;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AvailableRoutes />
    </BrowserRouter>
  );
}

export default App;
