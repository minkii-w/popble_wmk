import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    
    if (tokenFromURL) {

      setToken(tokenFromURL);
      console.log('Received token:', tokenFromURL);

      
      navigate('/');
    } else {

      console.error('No token found in URL');
    }
  }, [navigate]);

  return (
    <div>
      {token ? (
        <p>Token received successfully: {token}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OAuthCallback;