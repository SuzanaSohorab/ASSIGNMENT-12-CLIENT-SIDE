import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext/AuthContext';
import { Navigate } from 'react-router';

const PrivateRoutes = () => {
     const { user, loading } = useContext(AuthContext); 


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700 text-xl font-semibold">
        Loading...
      </div>
    );
  }
  if(!user){
    return <Navigate to="login"></Navigate>
  }
};

export default PrivateRoutes;