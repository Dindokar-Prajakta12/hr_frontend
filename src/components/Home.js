


// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Home.css';
// import login from '../Assets/login.png';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="w-full flex justify-center items-center min-h-screen px-4 py-6 bg-orange-100">
//       <div className="bg-white w-full max-w-5xl shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
//         {/* Left Image Section */}
//         <div className="md:w-1/2 w-full h-64 md:h-auto">
//           <img src={login} alt="login" className="w-full h-full object-cover" />
//         </div>

//         {/* Right Content Section */}
//         <div className="md:w-1/2 w-full flex flex-col justify-center items-center text-center px-6 py-8">
//           <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome to the HR Candidate Tracking System</h1>
//           <p className="text-base md:text-lg mb-6">Streamline your hiring process with our platform.</p>

//           <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
//             <button
//               onClick={() => navigate('/register')}
//               className="home-btn register-btn w-full sm:w-40"
//             >
//               Register
//             </button>
//             <button
//               onClick={() => navigate('/login')}
//               className="home-btn login-btn w-full sm:w-40"
//             >
//               Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import React from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../Assets/login.png';
import bgImage from '../Assets/bgimg.jpg'; // ✅ import the background image
import './Home.css'
const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="w-full flex justify-center items-center min-h-screen px-4 py-6"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white w-full max-w-5xl shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden bg-opacity-80">
        {/* Left Image Section */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img src={login} alt="login" className="w-full h-full object-cover" />
        </div>

        {/* Right Content Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center text-center px-6 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 text-black">
            Welcome to the HR Candidate Tracking System
          </h1>
          <p className="text-base md:text-lg mb-6 text-gray-700">
            Streamline your hiring process with our platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={() => navigate('/register')}
              className="home-btn register-btn w-full sm:w-40"
            >
              Register
            </button>
            <button
              onClick={() => navigate('/login')}
              className="home-btn login-btn w-full sm:w-40"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

