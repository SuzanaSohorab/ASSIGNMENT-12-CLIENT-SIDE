import React from 'react';
import UseAuth from '../Hooks/UseAuth';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user,loading}= UseAuth(); 
    if (loading){
        return <span className="loading loading-dots loading-xl"></span>
    }
    if(!user){
        <Navigate to="/login"></Navigate>
    }
    return children;
};

export default PrivateRoutes;