import React from 'react'
import './BackToLogin.css'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
const BackToLogin = () => {
    const navigate = useNavigate()
    const navigateHandler = ()=>{
        navigate('/login')

    }
  return (
    <div onClick={navigateHandler} className='back_tologin_ui'>
      <FaArrowLeftLong />
      <span>back to login</span>
    </div>
  )
}

export default BackToLogin
