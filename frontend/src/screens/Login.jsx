import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../config/axios';
import {UserContext} from '../context/user.context'



const Login = () => {
  const navigate = useNavigate();


  const {setUser} = useContext(UserContext);


  const[formdata,setformdata]= useState({
    email:"",
    password:""
  })

  function DataHandler(e){
    setformdata({...formdata,[e.target.name]:e.target.value})
  }

  function submitHandler(e){
    e.preventDefault();


    axios.post('/login',formdata).then((response)=>{
        console.log(response.data);

        localStorage.setItem('token',response.data.token);
        setUser(response.data.user);


        navigate('/');
    }).catch((e)=>{console.log(e)});

    
  }


  function navigateHandler() {
    navigate("/register");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h1>
        
        <form onSubmit={(e)=>submitHandler(e)} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
            value={formdata.email}
            onChange={(e)=>DataHandler(e)}
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
            value={formdata.password}
            onChange={(e)=>DataHandler(e)}
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              onClick={navigateHandler}
              className="text-pink-600 hover:underline cursor-pointer font-medium"
            >
              Create one
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
