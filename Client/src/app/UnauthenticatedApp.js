import { Route, Routes } from 'react-router-dom';
import Homepage from '../Components/Homepage/Homepage';
import RedirectHome from './RedirectHome';

export default function UnauthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="*" element={<RedirectHome />} />
    </Routes>
  );
}
