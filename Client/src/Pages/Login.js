import React from 'react';
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const validateEmail = (email) => {
        // Simple email validation regex
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        // Ensure password is at least 6 characters long
        return password.length >= 6;
    };

    const OnSubmitHandler = async (e) => {
        e.preventDefault();
        let valid = true;
        
        // Reset error messages
        setEmailError("");
        setPasswordError("");

        if (!email) {
            setEmailError("Email is required.");
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError("Please enter a valid email.");
            valid = false;
        }

        if (!password) {
            setPasswordError("Password is required.");
            valid = false;
        } else if (!validatePassword(password)) {
            setPasswordError("Password must be at least 6 characters.");
            valid = false;
        }

        if (valid) {
            try {
      

                if (email === process.env.REACT_APP_EMAIL && password === process.env.REACT_APP_PASSWORD) {
                    localStorage.setItem('isLoggedIn', 'true');
                    navigate('/privateRoutes/Dashboard');
                } else {
                    toast.error('Invalid email or password.');
                }
            } catch (error) {
                toast.error('Something went wrong.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                    PPP Print Portal
                </h2>
                <form onSubmit={OnSubmitHandler}>
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
                        {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
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
                        {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
