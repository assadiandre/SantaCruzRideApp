import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function RedirectSetupFeed() {
  const [userObject, setsUserObject] = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (userObject.setupFlag) {
      navigate('/feed');
    } else {
      navigate('/setup');
    }
  });
}
