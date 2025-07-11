import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./tailwind.css";
import image from '../assets/image.PNG';

function Welcome() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();

    // Set favicon
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = '/Home.png';
    document.getElementsByTagName('head')[0].appendChild(link);
    // Set page title
    document.title = "Clash of Patrols";

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

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden">
            {/* Main Content */}
            <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {/* Title with Gradient Text */}
                <div className="text-center mb-8 sm:mb-12">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-black">
                        Clash of Patrols <br /> XI
>>>>>>> d337c09c792dd127980d23e1f60ede233a1da4a8
                    </h1>
                </div>

                {/* Main Card */}
                <div className="w-full max-w-xs xs:max-w-sm sm:max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <div className="p-4 sm:p-6 text-center">
                        {/* Logo/Icon Placeholder with Gradient Background */}
                        <div className="flex justify-center">
                            <div className="w-80 xs:w-96 sm:w-[900px] h-40 xs:h-44 sm:h-64 bg-white/20 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                            {/* Image */}
                                <img src={image} alt="" className="max-h-full max-w-full object-contain" />
                            </div>
                        </div>

                        {/* Welcome Text */}
                        <div className="mb-6 sm:mb-8">
                            <h2 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">
                                Welcome Back!
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-xs xs:text-sm">
                                Login in to continue your epic journey and unlock new adventures in the Clash of Patrols XI
>>>>>>> d337c09c792dd127980d23e1f60ede233a1da4a8
                            </p>
                        </div>

                        {/* Login Button */}
                        <button
                            type="button"
                            onClick={handleLogin}
                            className="w-full sm:w-96 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 sm:py-4 px-4 sm:px-8 rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                        >
                            <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                </svg>
                                Let's Start
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <footer className="text-black text-center py-4 px-2 sm:py-6 sm:px-4 mt-6 sm:mt-10 bg-transparent font-bold">
                <p className="text-xs sm:text-xs md:text-sm break-words">
                    The official game of summer season 2025. All rights are reserved to Scouts Cadre Eleventh Group 2025.
                </p>
                <div className="mt-2 sm:mt-4">
                    <p className="text-xs sm:text-xs md:text-sm break-words">Ch.Marco Magdy | Ch.Andrea Joseph | Ch.Mario Nader | Ch.Kevin Wael | Ch.Mario Amgad </p>
                </div>
                <div className="mt-2 sm:mt-4 flex flex-col items-center">
                    <p className="font-semibold underline mb-1 sm:mb-2 text-xs sm:text-xs">Developers:</p>
                    <p className="text-xs sm:text-xs">Front-end engineer: Eng. Ebraam Sobhy</p>
                    <p className="text-xs sm:text-xs">Back-end engineer: Eng. Mario Nader</p>
                </div>
            </footer>
        </div>
    );
}

export default Welcome;