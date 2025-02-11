import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; 

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/'); 
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? <Outlet /> : null; 
};

export default PrivateRoutes;
