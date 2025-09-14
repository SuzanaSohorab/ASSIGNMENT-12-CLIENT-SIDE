import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Logo from '../../../Components/Logo';

const Login = () => {
    const {register, handleSubmit} =useForm();

    
    const onSubmit =data =>{
        console.log(data);
    }
    return (
        <div className='m-20'>
            
           <form onSubmit={handleSubmit(onSubmit)}>
               <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" 
          {...register('email')}  className="input" placeholder="Email" />
          
          <label className="label">Password</label>
          <input type="password" 
          {...register('password')} className="input" placeholder="Password" />

          <div><a className="link link-hover">Forgot password?</a></div>

          <button className="btn btn-neutral mt-4 mb-5">Login</button>
        </fieldset>
        <div className='space-y-5'>
              <p>Don't have any account? <Link to="/register">Register </Link> </p>

        <SocialLogin></SocialLogin>
        </div>
      
            
            
            </form> 
         
        </div>
    );
};

export default Login;