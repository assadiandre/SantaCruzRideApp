import { Route, Routes } from 'react-router-dom';
import AccountSetup from '../components/AccountSetup/AccountSetup';
import Schedule from '../components/Schedule/Schedule';
import EndpointTest from '../components/EndpointTest/EndpointTest';
import FeedPage from '../components/FeedPage/FeedPage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import RedirectFeed from './RedirectFeed';

export default function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/setup" element={<AccountSetup />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/test" element={<EndpointTest />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/feedfilltest" element={<EndpointTest />} />
      <Route path="*" element={<RedirectFeed />} />
    </Routes>
  );
}
