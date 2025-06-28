import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import { GrScorecard } from "react-icons/gr";
import { PiSword } from "react-icons/pi";
import { GiTrade, GiHand } from "react-icons/gi";
import { FaHandHoldingHeart, FaChartLine } from "react-icons/fa";
import { GiCorn } from "react-icons/gi";

function Give() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);

        // Retrieve username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Give";
    }, []);

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-8 z-50 border-b border-blue-200">
                <span className="text-blue-700 font-semibold text-lg">{username}</span>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mr-20 px-6 py-2 rounded-xl shadow transition">Logout</button>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-20">
                {/* Vertical Navbar */}
                <div className="fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex flex-col items-center mt-[63px] z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* View Scores Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GrScorecard size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">View Scores</span>
                    </button>
                     {/* Attack Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiSword size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack Conditions</span>
                    </button>
                    {/* Feeding Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiTrade size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Trade</span>
                    </button>
                    {/* Take Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiHand size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Take</span>
                    </button>
                    {/* Transport Tab - Active */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <FaHandHoldingHeart size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Give</span>
                    </button>
                    {/* View Scores Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <FaChartLine size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">GDP</span>
                    </button>
                    {/* View Scores Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiCorn size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Harvest</span>
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
                    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative mt-10">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <form className="w-full max-w-6xl flex gap-8">
                                {/* Left Column - Dropdown */}
                                <div className="flex-1">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Patrol</h3>
                                        <select className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl mb-4">
                                            <option value="Panther">Panther</option>
                                            <option value="Lion">Lion</option>
                                            <option value="Cobra">Cobra</option>
                                            <option value="Tiger">Tiger</option>
                                            <option value="Fox">Fox</option>
                                            <option value="Wolf">Wolf</option>
                                        </select>

                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Type</h3>
                                        <select className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl">
                                            <option value="Horse">Horse</option>
                                            <option value="Cart">Cart</option>
                                            <option value="Apple Crop">Apple Crop</option>
                                            <option value="Wheat Crop">Wheat Crop</option>
                                            <option value="Watermelom Crop">Watermelom Crop</option>
                                            <option value="Apple Seeds">Apple Seeds</option>
                                            <option value="Wheat Seeds">Wheat Seeds</option>
                                            <option value="Watermelon Seeds">Watermelon Seeds</option>
                                            <option value="Coins">Coins</option>
                                            <option value="Soldiers">Soldiers</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Right Column - Labels and Inputs */}
                                <div className="flex-1">
                                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
                                        <div className="flex flex-col gap-4">
                                            {/* Quantity */}
                                            <div className="flex flex-col gap-2 justify-center items-center">
                                                <label htmlFor="give-quantity-label" className="text-white bg-gray-700 font-bold text-lg rounded-lg px-3 py-2 w-full text-center">Quantity</label>
                                                <input
                                                id="give-quantity-label"
                                                type="number"
                                                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg"
                                                placeholder="Enter quantity"
                                                />
                                            </div>
                                            {/* Land Number */}
                                            <div className="flex flex-col gap-2 justify-center items-center">
                                                <label htmlFor="give-land-number" className="text-white bg-gray-700 font-bold text-lg rounded-lg px-3 py-2 w-full text-center">Land Number</label>
                                                <input
                                                id="give-land-number"
                                                type="number"
                                                className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg"
                                                placeholder="must be from 1 - 33"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Give
