import React from 'react';
import Register from './components/auth/Register.js';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import ForgetPassword from './components/auth/ForgetPassword';
import VerifyOtp from './components/auth/VerifyOtp';
import UpdatePassword from './components/auth/UpdatePassword';
import Home from './components/Home.js';
import Dashboard from './components/ui/Dashboard/Dashboard.jsx';
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/forget/password' element={<ForgetPassword />} />
      <Route path='/otp/verify' element={<VerifyOtp />} />
      <Route path='/password/update' element={<UpdatePassword />} />
      <Route path='/dashboard' element={<Dashboard />} />
      
    </Routes>
  );
};

export default App;
