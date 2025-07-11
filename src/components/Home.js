import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import login from '../Assets/login.png'

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className=" w-full  flex justify-center  mt-[5vw]">
      <div className="bg-gray-200 w-[75vw] h-[80vh] flex shadow-mg rounded">
        <div className="w-1/2 h-full">
          <img src={login} alt="login" className='contain' />
        </div>

        <div className="w-1/2 flex flex-col justify-center align-center">
          <h1>Welcome to the HR candidate Tracking System</h1>
          <p>Streamline your hiring process with our platform.</p>
          <div className="flex justify-around">
            <button onClick={() => navigate('/register')} className="home-btn register-btn w-40">
              Register
            </button>
            <button onClick={() => navigate('/login')} className="home-btn login-btn w-40">
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

