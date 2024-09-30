import React, { useEffect, useState } from 'react'; // Correct imports
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { handleSuccess } from "../utils";
import { ToastContainer } from 'react-toastify';

function Home() {
  const [LoggedUser, setLoggedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedUser(localStorage.getItem('loggedInUser'));
  }, []); // Added an empty array so this runs only once

  const handlelogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logout successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const fetchProduct =async (req,res) => {
    try {
      const url = "http://localhost:8080/auth/products"
      const headers = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      }
      const response = await fetch(url,headers)
      const result = await response.json();
      
    } catch (error) {
      console.log("fetch data error in product")
    }
  }

  useEffect(()=>{
    fetchProduct()
  },[])


  return (
    <div className='flex flex-col justify-center items-center bg-zinc-700 h-screen text-white text-[30px]'>
      <h1 className='mb-5'>Welcome {LoggedUser}</h1> 
      <div>
        <button onClick={handlelogout} className='px-4 py-1 rounded-md bg-blue-500'>LogOut</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;
