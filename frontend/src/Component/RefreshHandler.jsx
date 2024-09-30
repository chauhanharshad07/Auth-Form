import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function RefreshHandler({setAuthorization}) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
      if(localStorage.getItem("token")){
        setAuthorization(true);
        if(
          location.pathname === "/" ||
          location.pathname === "/login" ||
          location.pathname === "/signup"
        ){
          navigate("/home",{replace:true})
        }
      }
  },[])
  return (
    null
  )
}

export default RefreshHandler
