import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import { FaTint } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Watering() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [patrol, setPatrolName] = useState("");
    const navigate = useNavigate();

    const GoToHome = () => {
        navigate('/kadr');
        setIsMobileMenuOpen(false);
    };

    // Animation effect
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);

        // Retrieve username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }

        // favicon
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/public/Home.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Watering";
    }, []);

    const handleLogout = async () => { 
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                await fetch('https://projectrobin.onrender.com/authen/signout', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch {
                toast.error("Logout failed on server.", { position: "top-center" });
            }
            localStorage.removeItem("username");
            toast.info("Logged out successfully!", { position: "top-center" });
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    // Watering 
    async function waterPlants() {
        if (!patrol.trim()) {
            toast.error("Please enter a patrol name", { position: "top-center" });
            return;
        }

        try {
            const response = await fetch('https://projectrobin.onrender.com/Chef/watering', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patrol
                }),
            });
        
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error watering plants');
            }
            
            toast.success(data.message || 'Plants watered successfully!', { position: "top-center" });
            setPatrolName(""); // Clear the input after successful watering
            
        } catch (error) {
            toast.error(error.message || 'Failed to water plants. Please try again.', { position: "top-center" });
            console.error('Watering error:', error);
        }
    }

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-8 z-50 border-b border-blue-200">
                {/* Username on the left */}
                <span className="text-blue-700 font-bold text-sm sm:text-lg truncate max-w-[120px] sm:max-w-none capitalize">
                    <span className='text-green-600 font-bold text-sm sm:text-lg'>Ch.</span>{username}
                </span>

                {/* Mobile menu button */}
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-md hover:bg-blue-50 transition"
                >
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Logout button on the right - hidden on mobile */}
                <button onClick={handleLogout} className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow transition mr-20">Logout</button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 lg:hidden border-b border-blue-200">
                    <div className="flex flex-col py-4 justify-center items-center">
                        <button 
                            onClick={GoToHome}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                            </svg>
                            <span className="font-semibold">Home</span>
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition mt-2 border-t border-gray-100"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span className="font-semibold">Logout</span>
                        </button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-4 sm:p-8 lg:p-20 pt-20 lg:pt-20">
                {/* Vertical Navbar - hidden on mobile */}
                <div className="hidden lg:flex fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex-col items-center mt-[63px] z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button onClick={GoToHome} className="w-full flex flex-col items-center py-1 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                </div>
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-10 w-20 h-20 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-lg"></div>
                </div>

                <div className={`transform transition-all duration-1000 ease-out w-full max-w-4xl ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 lg:space-y-8">
                            {/* Watering Form */}
                            <div className="group relative w-full max-w-md">
                                <div className="absolute -inset-1 bg-gradient-to-r bg-blue-400 rounded-xl sm:rounded-2xl blur transition duration-300"></div>
                                <div className="relative bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-100 shadow-sm">
                                    <div className="text-center mb-4">
                                        <FaTint className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                                        <h3 className="text-lg font-semibold text-gray-800">Water Plants</h3>
                                        <p className="text-sm text-gray-600">Enter patrol name to water their plants</p>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="patrolName" className="block text-sm font-medium text-gray-700 mb-2">
                                                Patrol Name
                                            </label>
                                            <input
                                                type="text"
                                                id="patrolName"
                                                value={patrol}
                                                onChange={(e) => setPatrolName(e.target.value)}
                                                placeholder="Enter patrol name..."
                                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            />
                                        </div>
                                        
                                        <button
                                            onClick={waterPlants}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        >
                                            Watering
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Watering;
