import React, { useEffect,useRef, useState } from 'react'
import { FaFingerprint } from "react-icons/fa";
import './auth.css'
import BackToLogin from '../ui/BackToLogin';
import Button from '../ui/Button';
import Timer from './Timer';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apis from '../../utils/apis';
const VerifyOtp = () => {


    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)
    const ref5 = useRef(null)
    const ref6 = useRef(null)
 
    const navigate = useNavigate();
    const inputRef = [ref1,ref2,ref3,ref4,ref5,ref6];

    const [otp1,setOtp1] = useState('');
    const [otp2,setOtp2] = useState('');
    const [otp3,setOtp3] = useState('');
    const [otp4,setOtp4] = useState('');
    const [otp5,setOtp5] = useState('');
    const [otp6,setOtp6] = useState('');

    const otpArray = [setOtp1,setOtp2,setOtp3,setOtp4,setOtp5,setOtp6];


    useEffect(()=>{
        if(ref1.current){
            ref1.current.focus();
        }
    })

    const inputChange = (event,location)=>{
        if(location < 5 && event.target.value){
            inputRef[location+1].current.focus();
        }
        otpArray[location](event.target.value);
    }

    const submitHandler = async (event)=>{
        event.preventDefault();
        // console.log(otp1,otp2,otp3,otp4,otp5,otp6);
        const finalOtp = otp1+otp2+otp3+otp4+otp5+otp6
        console.log(finalOtp);
        try {
            const response = await fetch(apis().otpVerify,{
                method:'POST',
                body:JSON.stringify({otp:finalOtp}),
                headers:{'Content-Type' :'application/json'}
            })

            const result = await response.json()
            if(!response.ok){
                throw new Error(result?.message)

            }
            if(result?.status){
                console.log(result)
                toast.success(result?.message)
                navigate("/password/update");
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
                <FaFingerprint />
                <p className='auth_heading'> Verify your OTP</p>
                <p className='auth_title'> Enter 6-digit OTP here we just sent at your email</p>


                </div>
                <div className='auth-item'>
                    <label> OTP *</label>
                    <div className='otp_input_container'>
                        {inputRef.map((item,index)=>{
                            return <input 
                            required
                            key={index}
                            onChange={(event)=>inputChange(event, index) }
                            ref={item}
                             onInput={(event)=>{
                                if(event.target.value.length >1) {
                                    event.target.value = event.target.value.slice(0,1)
                                }

                            }} type='number'  className='ui_input otp_input' />
                        })}
                    </div>

                </div>
                <div className='auth_action'>
                    <Button>Verify</Button>


                </div>
                <div>
                    <Timer/>
                </div>

                <div>
                    <BackToLogin/>
                </div>


            </div>

        </form>

    </div>
  )
}

export default VerifyOtp
