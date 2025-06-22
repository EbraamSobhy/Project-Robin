import React, { useEffect, useState } from 'react';
import './tailwind.css'
import image from '../assets/image.PNG';
import { GrScorecard } from "react-icons/gr";

function Scout() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    // Example username, replace with actual username from props or context when available
    const username = "Username";

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-8 z-50 border-b border-blue-200">
                {/* Username on the left */}
                <span className="text-blue-700 font-semibold text-lg">{username}</span>
                {/* Logout button on the right */}
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mr-20 px-6 py-2 rounded-xl shadow transition">Logout</button>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-20">
                {/* Vertical Navbar */}
                <div className="fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex flex-col items-center py-8 mt-[63px] space-y-4 z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* View Scores Tab */}
                    <button className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GrScorecard size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">View Scores</span>
                    </button>
                </div>
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
                </div>

                <div className={`transform transition-all duration-1000 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col items-center space-y-8">
                            {/* First Image */}
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r bg-gray-400 rounded-2xl blur transition duration-300"></div>
                                <div className="relative">
                                    <div className="bg-white inline-block px-6 py-4 rounded-xl text-right border border-blue-100 shadow-sm" dir="rtl" lang="ar">
                                        <p className="text-2xl text-black mb-2">
                                            لَا تُهْمِلِ الْمَوْهِبَةَ الْخَاصَّةَ الَّتِي فِيكَ، الَّتِي أُعْطِيَتْ لَكَ بِالتَّنَبُّوءِ وَوَضْعِ الشُّيُوخِ أَيْدِيَهُمْ عَلَيْكَ.
                                        </p>
                                        <p className="text-lg text-gray-600">
                                            تيموثاوس الأولى 4:14
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="w-60 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>

                            {/* Second Image */}
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r bg-gray-400 rounded-xl blur transition duration-300"></div>
                                <div className="relative">
                                    <img
                                        src={image}
                                        alt="Second Image"
                                        className="w-[900px] object-cover rounded-xl shadow-lg transform transition duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Scout;