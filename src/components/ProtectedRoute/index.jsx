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
        console.log('here');
        await axios({
          method: 'POST',
          url: `http://${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_AUTH_PORT}/auth/validate`,
          data: {
            token
          }
        }).then(()=>{
          setAuthenticated(true);
        });
      }catch(err){
        console.log(err);
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
