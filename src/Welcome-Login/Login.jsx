import React, { useEffect, useState } from 'react';
import "./tailwind.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Set favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/Login.png';
    document.getElementsByTagName('head')[0].appendChild(link);
    // Set page title
    document.title = "Login";

    useEffect(() => {
        // Set sophisticated gradient background
        document.body.style.background = '#87CEEB';
        document.body.style.minHeight = '100vh';
        
        // Trigger entrance animation
        const timer = setTimeout(() => setIsVisible(true), 100);
        
        return () => {
            document.body.style.background = '';
            document.body.style.minHeight = '';
            clearTimeout(timer);
        };
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle login logic here
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                'http://localhost:3000/authen/login',
                {
                    name: formData.username,
                    password: formData.password
                },
                {
                    withCredentials: true,
                }
            );
    /**
            if condition (rank)
            1 => Scout
            2 => CP
            3 => Kadr
     */
            if (response.data.success) {
                const username = response.data.user.username;
                const rank = response.data.user.rank;
            
                let rankTitle = '';
                let redirectPath = '/';
                switch (rank) {
                    case 1:
                        rankTitle = 'Scout';
                        redirectPath = '/scout';
                        break;
                    case 2:
                        rankTitle = 'CP';
                        redirectPath = '/cp';
                        break;
                    case 3:
                        rankTitle = 'Kadr';
                        redirectPath = '/kadr';
                        break;
                    default:
                        rankTitle = 'Unknown';
                        redirectPath = '/';
                }

            // Store user data in localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("username", username);
            localStorage.setItem("rank", rank);

                toast.success(`Welcome, ${username} (${rankTitle})`, {
                    position: 'top-center',
                });
                setTimeout(() => {
                    navigate(redirectPath);
                }, 1000); // Give user time to see the toast

            } else {
                toast.error(response.data.msg, {
                    position: 'top-center',
                });
            }
        } catch {
            toast.error('Login failed. Please try again.', {
                position: 'top-center',
            });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Main Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {/* Main Card */}
                <div className="w-full max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <div className="p-6 text-center">
                        {/* Logo/Icon Placeholder with Gradient Background */}
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <form className="space-y-4 mb-6">
                            {/* Username Field */}
                            <div className="text-left">
                                <label htmlFor="username" className="text-sm font-medium text-gray-700 block mb-2">
                                    User Name
                                </label>
                                <div className="relative">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 pl-12 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your User Name"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="text-left">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700 block mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 pl-12 pr-12 text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Enter your password"
                                    />
                                    <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                            </svg>
                                        ) : (
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Login Button */}
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                        >
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                LogIn to Play
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;