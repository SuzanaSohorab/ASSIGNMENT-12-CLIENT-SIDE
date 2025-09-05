import React from 'react';
import { useForm } from 'react-hook-form';

const Registration = () => {
    const {register, handleSubmit} =useForm();
    const onSubmit =data =>{
        console.log(data);
    }
    return (
        <div>

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
            
            
            </form> 
         
        </div>
    );
};

export default Registration;