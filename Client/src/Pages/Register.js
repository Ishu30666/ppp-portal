import React from 'react'
import { useState } from "react";
import { ToastContainer ,Toast, toast} from 'react-toastify';
import { Link } from 'react-router-dom';
import { AxiosApiClient } from '../AxiosConstants/axiosInstance';
import { RegisterRoutes } from '../AxiosConstants/constant';
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const OnSubmitHandler =async (e) => {
        e.preventDefault()
      try {
        const response= await AxiosApiClient.post(RegisterRoutes,{email,password},{withCredentials:true}) 
      if(response.status==201)
      {
        toast.success("Succesfully Register New Account")
      }
      else{
        toast.error(
          response.data.message
        )
      }
      } catch (error) {
       toast.error('Something went wrong.'); 
      }
    };
  
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <ToastContainer />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
            Register New Account
          </h2>
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={OnSubmitHandler}
            >
              Login
            </button>
            <p>Already have an account <Link to="/" className='text-blue-500'>Login</Link></p>
          </form>
        </div>
      </div>
    );
}

export default Register
