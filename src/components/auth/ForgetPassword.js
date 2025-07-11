import React, { useState } from 'react'
import './auth.css'
import Input from '../ui/Input'
import Button from '../ui/Button'
import BackToLogin from '../ui/BackToLogin'
import { MdOutlineAttachEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import apis from '../../utils/apis'

const ForgetPassword = () => {
    const [email , setEmail] = useState('');
    const navigate = useNavigate()

    const emailChanger = (event)=>{
        setEmail(event.target.value)
    }
    const submitHandler = async(event)=>{
        event.preventDefault()

        try {
            const response = await fetch(apis().forgetPassword,{
                method:'POST',
                body:JSON.stringify({email}),
                headers:{'Content-Type': 'application/json'}
            })

            const result = await response.json()
            if(!response.ok){

                throw new Error(result?.message)
            }
            if(result?.status){
                toast.success(result?.message);
                localStorage.setItem('passToken',result?.token)
                localStorage.setItem("email", email);
                navigate('/otp/verify');
            }
            
        } catch (error) {
            toast.error(error.message)
            
        }
        
      
    }


  return (
    <div className='auth_main'>
        <form onSubmit={submitHandler}>
            <div className='auth_container'>

                <div className='auth_header'>
                <MdOutlineAttachEmail />
                    <p className='auth_heading'>Forget your password</p>
                    <p className='auth_title'> Enter a registered email we will send a 6-digit OTP</p>
                </div>
                <div className='auth_item'>
                    <label>Email</label>
                    <Input onChange={emailChanger} placeholder='Enter your email' type='email' required></Input>


                </div>
                <div className='auth_action'>
                    <Button>Send OTP</Button>

                </div>
                <div>
                    <BackToLogin/>
                </div>

            </div>

        </form>
      
    </div>
  )
}

export default ForgetPassword
