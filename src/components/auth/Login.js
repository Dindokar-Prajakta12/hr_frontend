import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosLogIn } from 'react-icons/io';
import toast from 'react-hot-toast';
import apis from '../../utils/apis';
import { Oval } from 'react-loader-spinner'; // ⬅️ Import spinner

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Spinner state
    const navigate = useNavigate();

    const emailChange = (event) => setEmail(event.target.value);
    const passwordChange = (event) => setPassword(event.target.value);

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(apis().loginUser, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: { 'content-type': 'application/json' }
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result?.message);
            }

            if (result?.status) {
                toast.success(result?.message);
                localStorage.setItem('accessToken', result?.token);
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='auth_main'>
            <form onSubmit={submitHandler}>
                <div className='auth_container'>
                    <div className='auth_header'>
                        <IoIosLogIn />
                        <p className='auth_heading'> Welcome back</p>
                        <p className='auth_title'> Login to continue</p>
                    </div>
                    <div className='auth_item'>
                        <label>Email *</label>
                        <Input onChange={emailChange} type='email' required placeholder='Enter your email' disabled={loading} />
                    </div>
                    <div className='auth_item'>
                        <label>Password *</label>
                        <Input onChange={passwordChange} type='password' required placeholder='Enter your password' disabled={loading} />
                    </div>
                    <div className='auth_action'>
                        <Button disabled={loading}>
                            {loading ? (
                                <Oval
                                    height={20}
                                    width={20}
                                    color="#fff"
                                    secondaryColor="#ccc"
                                    strokeWidth={5}
                                    strokeWidthSecondary={5}
                                />
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </div>
                    <div className='auth_options'>
                        <Link to='/register'>Create new account</Link>
                        <Link to='/forget/password'>Forget Password</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
