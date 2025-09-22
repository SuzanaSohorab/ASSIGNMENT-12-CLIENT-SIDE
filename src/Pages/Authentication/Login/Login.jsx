import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

import Swal from 'sweetalert2';
import { AuthContext } from '../../../Contexts/AuthContext/AuthContext';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const loggedInUser = await signIn(data.email, data.password);
      console.log("Logged in:", loggedInUser);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/"); // redirect to home after login
    } catch (error) {
      console.error("Login failed", error);
      Swal.fire("Error", "Invalid email or password", "error");
    }
  };

  return (
    <div className="m-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            {...register('email')}
            className="input"
            placeholder="Email"
          />

          <label className="label">Password</label>
          <input
            type="password"
            {...register('password')}
            className="input"
            placeholder="Password"
          />

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-neutral mt-4 mb-5">
            Login
          </button>
        </fieldset>

        <div className="space-y-5">
          <p>
            Don't have any account? <Link to="/register">Register</Link>
          </p>
          <SocialLogin></SocialLogin>
        </div>
      </form>
    </div>
  );
};

export default Login;
