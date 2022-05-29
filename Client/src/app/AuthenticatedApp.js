import { Route, Routes } from 'react-router-dom';
import AccountSetup from '../Components/AccountSetup/AccountSetup';
import Schedule from '../Components/Schedule/Schedule';
import FeedPage from '../Components/FeedPage/FeedPage';
import ProfilePage from '../Components/ProfilePage/ProfilePage';
import RedirectSetupFeed from './RedirectSetupFeed';

export default function AuthenticatedApp() {
  return (
    <Routes>
      <Route path="/setup" element={<AccountSetup />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<RedirectSetupFeed />} />
    </Routes>
  );
}
