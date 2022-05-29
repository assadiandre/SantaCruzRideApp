import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectFeed() {
  const navigate = useNavigate();
  console.log('REDIRECT');
  useEffect(() => {
    navigate('/feed');
  });
}
