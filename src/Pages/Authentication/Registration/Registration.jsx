import React from 'react';
import { useForm } from 'react-hook-form';
import UseAuth from '../../../Hooks/UseAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import Swal from 'sweetalert2';
import { updateProfile } from "firebase/auth";


const Registration = () => {
    const {register, handleSubmit} =useForm();
    const {createUser} = UseAuth();

    const onSubmit = async (data) =>{
    
        console.log(data);
        createUser(data.email,data.password)
        
        .then(async(result)  =>{
            // console.log(result.user);
            await updateProfile(result.user, {
          displayName: data.name || data.email,
          photoURL: data.photo,})

             Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Welcome to our platform!",
        timer: 2000,
        showConfirmButton: false,
      });
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
          <label className="label">Name</label>
          <input type="name" 
          {...register('name')}  className="input" placeholder="Name" />
          <label className="label">Email</label>
          <input type="email" 
          {...register('email')}  className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" 
          {...register('password')} className="input" placeholder="Password" />
          
          

          <label className="label">Photo URL</label>
          <input
            type="text"
            {...register('photo')}
            className="input"
            placeholder="Enter Photo URL"
          />

          

          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
            <p>Already have an account? <Link to="/login">Login </Link> </p>
            
            </form> 
            <SocialLogin></SocialLogin>
         
        </div>
    );
};

export default Registration;