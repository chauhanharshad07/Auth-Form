import React, { useState } from 'react'
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Signup from './Component/Signup'
import Home from './Component/Home'
import RefreshHandler from './Component/RefreshHandler';


function App() {

  const [isAuthorization,setAuthorization] = useState(false);

  const PrivateRoute = ({element}) =>{
    return isAuthorization ? element : <Navigate to="/login" />
  }

  return (
    <>
      <div >
        <RefreshHandler setAuthorization={setAuthorization} />

        <Routes>
          <Route path='/' element={<Navigate to="/login" />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/home' element={<PrivateRoute element={<Home/>} />}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App
