import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import { handleError } from '../utils';

function Login() {
  const [Logininfo, setLogininfo] = useState({
    email: '',
    password: ''
  });

  const navigate =  useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedLoginInfo = { ...Logininfo, [name]: value };
    setLogininfo(updatedLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = Logininfo;
    if (!email || !password) {
      return handleError("Email and password are required.");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Logininfo)
      });
      const result = await response.json();
  
      const { success, message, jwtToken, name, error, emailNotFound } = result;
  
      if (emailNotFound) {
        handleError("Email not found. Redirecting to signup page...");
        setTimeout(() => {
          navigate('/signup');
        }, 1500);
      } else if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        handleError(error);
      } else if (!success) {
        handleError(message);
      }
  
      console.log(result);
    } catch (error) {
      handleError("An error occurred during Login.");
    }
  };
  

  return (
    <div className='flex justify-center items-center bg-zinc-700 h-screen'>
      <form onSubmit={handleLogin} className='border-[0.1px] p-5 border-gray-800 shadow-lg rounded-lg shadow-zinc-900/50'>
        <h1 className='text-3xl text-center text-white font-bold my-5'>Login</h1>
        <div className='set'>
          <label htmlFor="email">Email:</label>
          <input 
            onChange={handleChange} 
            type="email" 
            name="email" 
            placeholder='Enter Your Email' 
            value={Logininfo.email} 
          />
        </div>
        <div className='set'>
          <label htmlFor="password">Password:</label>
          <input 
            onChange={handleChange} 
            type="password" 
            name="password" 
            placeholder='Enter Your Password' 
            value={Logininfo.password} 
          />
        </div>
        <span className='new text-zinc-900 font-semibold'>
          Don't have an account?
          <Link className='tag' to="/signup"> Sing Up </Link>
        </span>
        <br />
        <button onClick={handleLogin} className='lgbtn px-4 py-1 rounded-md bg-blue-500'>
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
