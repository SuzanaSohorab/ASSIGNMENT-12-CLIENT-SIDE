import React from 'react';
import { Outlet } from 'react-router';
import authpic from '../assets/authPic.jpg'

const AuthLayout = () => {
    return (
        <div className='m-10'>
            <div className=" p-12 hero bg-base-200 ">
  <div className="hero-content flex-col lg:flex-row-reverse">
  <div className='flex-1'>
      <img
      src={authpic}
      className="max-w-sm rounded-lg shadow-2xl"
    />
  </div>
    <div  className='flex-1'>
      <Outlet></Outlet>
    </div>
  </div>
</div>
        </div>
    );
};

export default AuthLayout;