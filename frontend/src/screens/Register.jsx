import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import axios from '../config/axios';
import { UserContext } from '../context/user.context';

const Register = () => {
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext);

  const [formdata, setformdata] = useState({
    email: '',
    password: ''
  });

  function DataHandler(e) {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function submitHandler(e) {
    e.preventDefault();
    // console.log("Registered with:", formdata);

    axios.post('/register',formdata).then((response)=>{
            console.log(response.data);
            localStorage.setItem('token',response.data.token);
            setUser(response.data.user);
            navigate('/');
        }).catch((e)=>{console.log(e)});
    
  }

  function navigateHandler() {
    navigate('/login');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600">
      <div className="bg-white/30 backdrop-blur-md shadow-2xl rounded-2xl p-10 w-full max-w-md animate-fade-in-down">
        <h1 className="text-4xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow">
          Create an Account ✨
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-white mb-1">
              Email Address
            </label>
            <input
              value={formdata.email}
              onChange={DataHandler}
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-md bg-white/90 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-white mb-1">
              Password
            </label>
            <input
              value={formdata.password}
              onChange={DataHandler}
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-2 rounded-md bg-white/90 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-500 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/80">
            Already have an account?{' '}
            <span
              onClick={navigateHandler}
              className="text-yellow-300 hover:underline cursor-pointer font-medium"
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
