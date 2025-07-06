import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import { GrScorecard } from "react-icons/gr";
import { PiSword } from "react-icons/pi";
import { GiTrade, GiHand } from "react-icons/gi";
import { FaHandHoldingHeart, FaChartLine } from "react-icons/fa";
import { GiCorn } from "react-icons/gi";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AttackConditions() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [form, setForm] = useState({
        soldiers: 0,
        houses: 0,
        lands: 0,
        coins: 0,
        inLandSoldiers: 0,
        landNo: 0,  
    });

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === "number" && value !== "" ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/Chef/attackConditions', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch {
            toast.error("Network error");
        }
    };

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
        link.href = '/AttackCondition.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Attack Conditions";
    }, []);

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

    // Navigate
    const Home = () => {
        navigate('/kadr');
    };

    const UpdateScores = () => {
        navigate('/kadr/scores');
    };

    const Trade = () => {
        navigate('/kadr/Trade');
    };

    const Take = () => {
        navigate('/kadr/Take');
    };

    const Give = () => {
        navigate('/kadr/Give');
    };

    const GDP = () => {
        navigate('/kadr/GDP');
    };

    const Harvest = () => {
        navigate('/kadr/Harvest');
    };

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-8 z-50 border-b border-blue-200">
            <span className="text-blue-700 font-bold text-lg capitalize"><span className='text-green-600 font-bold text-lg'>Ch.</span>{username}</span>
                <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold mr-20 px-6 py-2 rounded-xl shadow transition">Logout</button>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-20">
                {/* Vertical Navbar */}
                <div className="fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex flex-col items-center mt-[63px] z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button onClick={Home} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* View Scores Tab */}
                    <button onClick={UpdateScores} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GrScorecard size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Update Scores</span>
                    </button>
                     {/* Attack Tab */}
                    <button onClick={AttackConditions} className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiSword size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack Conditions</span>
                    </button>
                    {/* Tade Tab */}
                    <button onClick={Trade} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiTrade size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Trade</span>
                    </button>
                    {/* Take Tab */}
                    <button onClick={Take} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiHand size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Take</span>
                    </button>
                    {/* Give Tab */}
                    <button onClick={Give} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <FaHandHoldingHeart size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Give</span>
                    </button>
                    {/* GDP Tab */}
                    <button onClick={GDP} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <FaChartLine size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">GDP</span>
                    </button>
                    {/* Harvest Tab */}
                    <button onClick={Harvest} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
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
                            <form className="w-full max-w-4xl flex flex-col gap-6" onSubmit={handleSubmit}>
                                {/* Land Number */}
                                <div className="flex items-center gap-4">
                                    <label htmlFor="attack-target-input" className="block text-white bg-gray-700 font-bold text-2xl rounded-lg px-2 py-1 w-44 flex-shrink-0">Land Number</label>
                                    <input
                                        id="attack-target-input"
                                        name="landNo"
                                        type="number"
                                        className="flex-1 px-8 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl"
                                        placeholder="Enter land number"
                                        value={form.landNo}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Soldiers */}
                                <div className="flex items-center gap-4">
                                    <label htmlFor="attack-strength-label" className="block text-white bg-gray-700 font-bold text-2xl rounded-lg px-2 py-1 w-48 flex-shrink-0">Total Soldiers</label>
                                    <input
                                        id="attack-strength-label"
                                        name="soldiers"
                                        type="number"
                                        className="flex-1 px-8 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl"
                                        placeholder="Enter total soldiers"
                                        value={form.soldiers}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Coins */}
                                <div className="flex items-center gap-4">
                                    <label htmlFor="attack-apples-label" className="block text-white bg-gray-700 font-bold text-2xl rounded-lg px-2 py-1 w-40 flex-shrink-0">Coins</label>
                                    <input
                                        id="attack-coins-label"
                                        name="coins"
                                        type="number"
                                        className="flex-1 px-8 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl"
                                        placeholder="0"
                                        value={form.coins}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Lands */}
                                <div className="flex items-center gap-4">
                                    <label htmlFor="attack-wheat-label" className="block text-white bg-gray-700 font-bold text-2xl rounded-lg px-2 py-1 w-36 flex-shrink-0">Lands</label>
                                    <input
                                        id="attack-lands-label"
                                        name="lands"
                                        type="number"
                                        className="flex-1 px-8 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl"
                                        placeholder="0"
                                        value={form.lands}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* InLandSoldiers */}
                                <div className="flex items-center gap-4">
                                    <label htmlFor="attack-watermelons-label" className="block text-white bg-gray-700 font-bold text-2xl rounded-lg px-2 py-1 w-44 flex-shrink-0">InLandSoldiers</label>
                                    <input
                                        id="attack-inLandSoldiers-label"
                                        name="inLandSoldiers"
                                        type="number"
                                        className="flex-1 px-8 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl"
                                        placeholder="0"
                                        value={form.inLandSoldiers}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Houses */}
                                <div className="flex items-center gap-4">
                                    <label htmlFor="attack-houses-label" className="block text-white bg-gray-700 font-bold text-2xl rounded-lg px-2 py-1 w-36 flex-shrink-0">Houses</label>
                                    <input
                                        id="attack-houses-label"
                                        name="houses"
                                        type="number"
                                        className="flex-1 px-8 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-xl"
                                        placeholder="0"
                                        value={form.houses}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-blue-600 transition w-[100px] mx-auto block text-center"
                                >Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default AttackConditions