import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';


const Registration = () => {
    const {register, handleSubmit} =useForm();
    const {createUser} = UseAuth();

    const onSubmit = async (data) =>{
        console.log(data);
        createUser(data.email,data.password)
        .then(result =>{
            console.log(result.user);
        })

        try {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    console.log("User added:", result);
  } catch (error) {
    console.error("Error adding user:", error);
  }

    }
    return (
        <div className='m-20'> 
           

           <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Create An Account</h1>
               <fieldset className="fieldset">
          <label className="label">Email</label>
          <input type="email" 
          {...register('email')}  className="input" placeholder="Email" />
          
          <label className="label">Password</label>
          <input type="password" 
          {...register('password')} className="input" placeholder="Password" />

          

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
            <p>Already have an account? <Link to="/login">Login </Link> </p>
            
            </form> 
            <SocialLogin></SocialLogin>
         
        </div>
    );
};

export default Registration;