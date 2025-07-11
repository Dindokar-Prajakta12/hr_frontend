import React, { useState } from 'react'
import Input from '../ui/Input'
import BackToLogin from '../ui/BackToLogin'
import Button from '../ui/Button'
import { RxUpdate } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apis from '../../utils/apis';


const UpdatePassword = () => {

    const [password , setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const passwordChange = (event)=>{
        setPassword(event.target.value)
    }

    const confirmPasswordChange = (event)=>{
        setConfirmPassword(event.target.value)
    }

    const submitHandler = async(event)=>{

        event.preventDefault();
        try {
            const response = await fetch(apis().UpdatePassword,{
                method:'POST',
                body:JSON.stringify({password,confirmPassword,token:localStorage.getItem('passToken')}),
                headers:{'Content-Type':'application/json'}
            })

            const result = await response.json()
            if(!response.ok){
                throw new Error(result?.message);
            }
            if(result?.status){
                console.log(result);
                toast.success(result?.message);
                navigate("/login");
                localStorage.removeItem("email");
                localStorage.removeItem("passToken");
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
                <RxUpdate />

                    <p className='auth_heading'> New Password</p>
                    <p className='auth_heading'>Enter atleast 6 digit long password </p>

                </div>
                <div className='auth_item'>
                    <label>Password *</label>
                    <Input onChange={passwordChange} type='text' required placeholder='new password'></Input>


                </div>
                <div className='auth_item'>
                    <label>conform password</label>
                    <Input onChange={confirmPasswordChange} type='text' required placeholder='conform password' ></Input>

                </div>
                <div className='auth_action'>
                <Button> Update Password</Button>

                </div>
                <div>
                    <BackToLogin/>
                </div>

            </div>
        </form>
      
    </div>

  )
}

export default UpdatePassword
