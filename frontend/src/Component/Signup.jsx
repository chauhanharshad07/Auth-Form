import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleSuccess } from '../utils';
import { handleError } from '../utils';

function Signup() {
  const [signupinfo, setsignupinfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate =  useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedSignupInfo = { ...signupinfo, [name]: value };
    setsignupinfo(updatedSignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupinfo;
    if (!name || !email || !password) {
      return handleError("Name, email, and password are required.");
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(signupinfo)
      });
      const result = await response.json();

      const {success,message,error} = result;

      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate('/login')
        }, 1000);
      }else if(error){
        handleError(error)
      }else if(!success){
        handleError(message)
      }
      console.log(result)

      
    } catch (error) {
      handleError("An error occurred during signup.");
    }
  };

  return (
    <div className='flex justify-center items-center bg-zinc-700 h-screen'>
      <form onSubmit={handleSignup} className='border-[0.1px] p-5 border-gray-800 shadow-lg rounded-lg shadow-zinc-900/50'>
        <h1 className='text-3xl text-center text-white font-bold my-5'>Signup</h1>
        <div className='set'>
          <label htmlFor="name">Name:</label>
          <input 
            onChange={handleChange} 
            type="text" 
            name="name" 
            placeholder='Enter Your Name' 
            value={signupinfo.name} 
            autoFocus 
          />
        </div>
        <div className='set'>
          <label htmlFor="email">Email:</label>
          <input 
            onChange={handleChange} 
            type="email" 
            name="email" 
            placeholder='Enter Your Email' 
            value={signupinfo.email} 
          />
        </div>
        <div className='set'>
          <label htmlFor="password">Password:</label>
          <input 
            onChange={handleChange} 
            type="password" 
            name="password" 
            placeholder='Enter Your Password' 
            value={signupinfo.password} 
          />
        </div>
        <span className='new text-zinc-900 font-semibold'>
          Already have an account?
          <Link className='tag' to="/login"> Login </Link>
        </span>
        <br />
        <button onClick={handleSignup} className='lgbtn px-4 py-1 rounded-md bg-blue-500'>
          Signup
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Signup;
