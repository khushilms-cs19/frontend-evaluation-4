import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';

function ProtectedRoute({ redirect, element }) {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
   
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate(redirect);
      }
      try{
        await axios({
          method: 'POST',
          url: 'http://localhost:5000/auth/validate',
          data: {
            token
          }
        }).then(()=>{
          setAuthenticated(true);
        });
      }catch(err){
        navigate(redirect);
      }
    };
    if (localStorage.getItem('token')) {
      validateToken();
    }else{
      navigate(redirect);
    }
  }, []);
  return authenticated?element:<p>Loading...</p>;
}

ProtectedRoute.propTypes = {
  redirect: PropTypes.string,
  element: PropTypes.element,
};

export default ProtectedRoute;
