// Home.jsx - (No changes needed, keeping for context)
import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import imageDefault from '../assets/image.PNG';
import { getSharedImage } from '../utils/sharedImage';
import { GrScorecard } from "react-icons/gr";
import { PiPlantBold } from "react-icons/pi";
import { GiEating } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";
import { MdLocalShipping } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [image, setImage] = useState(() => getSharedImage(imageDefault));
    const [patrolData, setPatrolData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
        link.href = '/Home.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Home";
    }, []);

    useEffect(() => {
        // Listen for storage changes (sync image across tabs/pages)
        const onStorage = () => setImage(getSharedImage(imageDefault));
        window.addEventListener('storage', onStorage);
        return () => {
            window.removeEventListener('storage', onStorage);
        };
    }, []);

    // Navigate
    function Buy() {
        navigate('/cp/buy');
    }

    function Plant() {
        navigate('/cp/plant');
    }

    function Feeding() {
        navigate('/cp/feeding');
    }

    function Attack() {
        navigate('/cp/attack');
    }

    function Transport() {
        navigate('/cp/transport');
    }

    function Scores() {
        navigate('/cp/scores');
    }

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

    const handleNav = (route) => {
        setIsMobileMenuOpen(false);
        navigate(route);
    };

    useEffect(() => {
        const fetchPatrolData = async () => {
            try {
                const response = await fetch('https://projectrobin.onrender.com/CP/', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setPatrolData(data.patrol || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatrolData();
    }, []);

    // Helper function to extract value from patrolData array
    const getValue = (key) => {
        const item = patrolData.find(item => item.includes(key));
        return item ? item.split(': ')[1] : '0';
    };

    if (loading) {
        return <div className="text-center mt-10 text-gray-700">Loading patrol data...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-600">Error: {error}</div>;
    }

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-8 z-50 border-b border-blue-200">
                <span className="text-blue-700 font-bold text-sm sm:text-lg capitalize truncate max-w-[120px] sm:max-w-none"><span className='text-blue-700 font-bold text-sm sm:text-lg'>CP.</span>{username}</span>
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
                <button onClick={handleLogout} className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow transition">Logout</button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 lg:hidden border-b border-blue-200">
                    <div className="flex flex-col py-4 justify-center items-center">
                        <button 
                            onClick={() => handleNav('/cp/home')}
                            className="flex items-center px-6 py-3 text-blue-700 bg-blue-50 transition justify-center"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                            </svg>
                            <span className="font-semibold">Home</span>
                        </button>
                        <button 
                            onClick={() => handleNav('/cp/buy')}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full justify-center"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="font-semibold">Buy</span>
                        </button>
                        <button 
                            onClick={() => handleNav('/cp/plant')}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full justify-center"
                        >
                            <PiPlantBold className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Plant</span>
                        </button>
                        <button 
                            onClick={() => handleNav('/cp/feeding')}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full justify-center"
                        >
                            <GiEating className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Feeding</span>
                        </button>
                        <button 
                            onClick={() => handleNav('/cp/attack')}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full justify-center"
                        >
                            <LuSwords className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Attack</span>
                        </button>
                        <button 
                            onClick={() => handleNav('/cp/transport')}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full justify-center"
                        >
                            <MdLocalShipping className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Transport</span>
                        </button>
                        <button 
                            onClick={() => handleNav('/cp/scores')}
                            className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full justify-center"
                        >
                            <GrScorecard className="w-5 h-5 mr-3" />
                            <span className="font-semibold">View Scores</span>
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition mt-2 border-t border-gray-100 w-full justify-center"
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
                    <button className="w-full flex flex-col items-center py-4 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* Buy Tab */}
                    <button onClick={Buy} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Buy</span>
                    </button>
                    {/* Plant Tab */}
                    <button onClick={Plant} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiPlantBold size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Plant</span>
                    </button>
                    {/* Feeding Tab */}
                    <button onClick={Feeding} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiEating size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Feeding</span>
                    </button>
                    {/* Attack Tab */}
                    <button onClick={Attack} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <LuSwords size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack</span>
                    </button>
                    {/* Transport Tab */}
                    <button onClick={Transport} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <MdLocalShipping size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Transport</span>
                    </button>
                    {/* View Scores Tab */}
                    <button onClick={Scores} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GrScorecard size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">View Scores</span>
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
                            {/* Home Page Unique Content */}
                            <div className="group relative w-full">
                                <div className="absolute -inset-1 bg-gradient-to-r bg-gray-400 rounded-xl sm:rounded-2xl blur transition duration-300"></div>
                                <div className="relative">
                                    <div className="bg-white inline-block px-3 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-xl text-right border border-blue-100 shadow-sm w-full" dir="rtl" lang="ar">
                                    {/* 
                                        <p className="text-sm sm:text-lg lg:text-2xl text-black mb-2 leading-relaxed">
                                            لَا تُهْمِلِ الْمَوْهِبَةَ الْخَاصَّةَ الَّتِي فِيكَ، الَّتِي أُعْطِيَتْ لَكَ بِالتَّنَبُّوءِ وَوَضْعِ الشُّيُوخِ أَيْدِيَهُمْ عَلَيْكَ.
                                        </p>
                                        <p className="text-xs sm:text-sm lg:text-lg text-gray-600">
                                            تيموثاوس الأولى 4:14
                                        </p>
                                         */}
                                    </div>
                                </div>
                            </div>
                            {/* Divider */}
                            <div className="w-32 sm:w-48 lg:w-60 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                            {/* Image Section */}
                            <div className="group relative w-full">
                                <div className="absolute -inset-1 bg-gradient-to-r bg-gray-400 rounded-lg sm:rounded-xl blur transition duration-300"></div>
                                <div className="relative">
                                    <img
                                        src={image}
                                        alt="Home Visual"
                                        className="w-full h-auto object-cover rounded-lg sm:rounded-xl shadow-lg transform transition duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-10 sm:mt-16 w-full">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100 shadow-sm">
                <div className="flex items-center mb-4 sm:mb-6">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-blue-800">Patrol Overview</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Military & Personnel */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-red-500 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Soldiers</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Soldiers:</span>
                                <span className="font-semibold text-gray-800">{getValue("total soldiers")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Infrastructure */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Buildings</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Houses:</span>
                                <span className="font-semibold text-gray-800">{getValue("total houses")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Workshops:</span>
                                <span className="font-semibold text-gray-800">{getValue("total workshops")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Transportation */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-purple-500 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Transportation</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Carts:</span>
                                <span className="font-semibold text-gray-800">{getValue("total carts")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Horses:</span>
                                <span className="font-semibold text-gray-800">{getValue("total horses")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Rent Horses:</span>
                                <span className="font-semibold text-gray-800">{getValue("rent horses")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Rent Carts:</span>
                                <span className="font-semibold text-gray-800">{getValue("rent carts")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Economy */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-yellow-500 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Economy</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Total Coins:</span>
                                <span className="font-semibold text-gray-800">{getValue("total coins")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Lands:</span>
                                <span className="font-semibold text-gray-800">{getValue("total lands")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Current GDP:</span>
                                <span className="font-semibold text-gray-800">{getValue("gdp")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Seeds & Crops */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Agriculture</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Wheat Seeds:</span>
                                <span className="font-semibold text-gray-800">{getValue("wheat seeds")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Apple Seeds:</span>
                                <span className="font-semibold text-gray-800">{getValue("apple seeds")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Watermelon Seeds:</span>
                                <span className="font-semibold text-gray-800">{getValue("watermelon seeds")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Harvest */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Harvest</h4>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Wheat:</span>
                                <span className="font-semibold text-gray-800">{getValue("wheat:")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Apple:</span>
                                <span className="font-semibold text-gray-800">{getValue("apple:")}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Watermelon:</span>
                                <span className="font-semibold text-gray-800">{getValue("watermelon:")}</span>
                            </div>
                        </div>
                    </div>

                    {/* Soil Management */}
                    <div className="bg-white rounded-lg p-4 border border-blue-200 shadow-sm sm:col-span-2 lg:col-span-3">
                        <div className="flex items-center mb-3">
                            <div className="w-6 h-6 bg-amber-700 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h4 className="font-semibold text-gray-800">Soil Management</h4>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                <span className="text-sm text-gray-600">Total Soil:</span>
                                <span className="font-semibold text-gray-800">{getValue("total soil")}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                <span className="text-sm text-gray-600">Wheat Soil:</span>
                                <span className="font-semibold text-gray-800">{getValue("wheat soil")}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                <span className="text-sm text-gray-600">Apple Soil:</span>
                                <span className="font-semibold text-gray-800">{getValue("apple soil")}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                <span className="text-sm text-gray-600">Watermelon Soil:</span>
                                <span className="font-semibold text-gray-800">{getValue("watermelon soil")}</span>
                            </div>
                            <div className="flex justify-between items-center bg-gray-50 rounded-lg p-3 sm:col-span-2 lg:col-span-1">
                                <span className="text-sm text-gray-600">Empty Soil:</span>
                                <span className="font-semibold text-gray-800">{getValue("empty soil")}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                <ToastContainer />
        </div>
    </div>
</div>
        </>
    );
}

export default Home;