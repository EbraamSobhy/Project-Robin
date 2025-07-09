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
                // Call backend logout endpoint
                await fetch('http://localhost:3000/authen/signout', {
                    method: 'POST',
                    credentials: 'include', // if using cookies/session
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

    // Navigation handlers for mobile menu (stub, you can add navigation logic)
    const handleNav = (route) => {
        setIsMobileMenuOpen(false);
        navigate(route);
    };

    const patrolData = [
        "Patrol Name:",
        "total soldiers: 5",
        "total houses: 3",
        "total carts: 2",
        "total workshops: 3",
        "total lands: 2",
        "total horses: 4",
        "total coins: 10",
        "rent horses: 1",
        "rent carts: 1",
        "wheat seeds: 3",
        "apple seeds: 1",
        "watermelon seeds: 3",
        "watermelon: 1",
        "apple: 1",
        "wheat: 2",
        "total soil: 8",
        "apple soil: 2",
        "watermelon soil: 3",
        "wheat soil: 1",
        "empty soil: 2"
    ];

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
                                        <p className="text-sm sm:text-lg lg:text-2xl text-black mb-2 leading-relaxed">
                                            لَا تُهْمِلِ الْمَوْهِبَةَ الْخَاصَّةَ الَّتِي فِيكَ، الَّتِي أُعْطِيَتْ لَكَ بِالتَّنَبُّوءِ وَوَضْعِ الشُّيُوخِ أَيْدِيَهُمْ عَلَيْكَ.
                                        </p>
                                        <p className="text-xs sm:text-sm lg:text-lg text-gray-600">
                                            تيموثاوس الأولى 4:14
                                        </p>
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
                        <div className="flex flex-col items-start justify-center border-l-4 border-gray-400 pl-3 sm:pl-6 mt-10 sm:mt-20">
                            {patrolData.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`text-xs sm:text-sm lg:text-base text-gray-800 mb-2 ${item !== "Patrol Name:" ? 'ml-2 sm:ml-4' : ''}`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Home