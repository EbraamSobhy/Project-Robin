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

function Trade() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [form, setForm] = useState({
        patrol1: "Panther",
        patrol2: "Panther",
        type1: "Horse",
        type2: "Horse",
        quantity1: 0,
        quantity2: 0,
        SLand1: "",
        SLand2: "",
        DLand1: "",
        DLand2: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/public/Trade.png';
        document.getElementsByTagName('head')[0].appendChild(link);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Trade";
    }, []);

    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to logout?")) {
            try {
                await fetch('http://localhost:3000/authen/signout', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/Chef/trade/process', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || "Trade successful!", { position: "top-center" });
            } else {
                toast.error(data.message || "Trade failed!", { position: "top-center" });
            }
        } catch {
            toast.error("Network error", { position: "top-center" });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Navigation functions (close mobile menu on nav)
    const Home = () => { navigate('/kadr'); setIsMobileMenuOpen(false); };
    const UpdateScores = () => { navigate('/kadr/scores'); setIsMobileMenuOpen(false); };
    const AttackConditions = () => { navigate('/kadr/AttackConditions'); setIsMobileMenuOpen(false); };
    const Take = () => { navigate('/kadr/Take'); setIsMobileMenuOpen(false); };
    const Give = () => { navigate('/kadr/Give'); setIsMobileMenuOpen(false); };
    const GDP = () => { navigate('/kadr/GDP'); setIsMobileMenuOpen(false); };
    const Harvest = () => { navigate('/kadr/Harvest'); setIsMobileMenuOpen(false); };

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-8 z-50 border-b border-blue-200">
                <span className="text-blue-700 font-bold text-sm sm:text-lg truncate max-w-[120px] sm:max-w-none capitalize"><span className='text-green-600 font-bold text-sm sm:text-lg'>Ch.</span>{username}</span>
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
                        <button onClick={Home} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg><span className="font-semibold">Home</span></button>
                        <button onClick={UpdateScores} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GrScorecard className="w-5 h-5 mr-3" /><span className="font-semibold">Update Scores</span></button>
                        <button onClick={AttackConditions} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><PiSword className="w-5 h-5 mr-3" /><span className="font-semibold">Attack Conditions</span></button>
                        <button className="flex items-center px-6 py-3 text-blue-700 bg-blue-50 transition"><GiTrade className="w-5 h-5 mr-3" /><span className="font-semibold">Trade</span></button>
                        <button onClick={Take} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GiHand className="w-5 h-5 mr-3" /><span className="font-semibold">Take</span></button>
                        <button onClick={Give} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><FaHandHoldingHeart className="w-5 h-5 mr-3" /><span className="font-semibold">Give</span></button>
                        <button onClick={GDP} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><FaChartLine className="w-5 h-5 mr-3" /><span className="font-semibold">GDP</span></button>
                        <button onClick={Harvest} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GiCorn className="w-5 h-5 mr-3" /><span className="font-semibold">Harvest</span></button>
                        <button onClick={handleLogout} className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition mt-2 border-t border-gray-100"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg><span className="font-semibold">Logout</span></button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-4 sm:p-8 lg:p-20 pt-20 lg:pt-20">
                {/* Vertical Navbar - hidden on mobile */}
                <div className="hidden lg:flex fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex-col items-center mt-[63px] z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button onClick={Home} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg><span className="text-xs text-blue-700 font-semibold">Home</span></button>
                    {/* View Scores Tab */}
                    <button onClick={UpdateScores} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><GrScorecard size={25} /></div><span className="text-xs text-blue-700 font-semibold">Update Scores</span></button>
                    {/* Attack Tab */}
                    <button onClick={AttackConditions} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><PiSword size={25} /></div><span className="text-xs text-blue-700 font-semibold">Attack Conditions</span></button>
                    {/* Trade Tab - Active */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><GiTrade size={25} /></div><span className="text-xs text-blue-700 font-semibold">Trade</span></button>
                    {/* Take Tab */}
                    <button onClick={Take} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><GiHand size={25} /></div><span className="text-xs text-blue-700 font-semibold">Take</span></button>
                    {/* Give Tab */}
                    <button onClick={Give} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><FaHandHoldingHeart size={25} /></div><span className="text-xs text-blue-700 font-semibold">Give</span></button>
                    {/* GDP Tab */}
                    <button onClick={GDP} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><FaChartLine size={25} /></div><span className="text-xs text-blue-700 font-semibold">GDP</span></button>
                    {/* Harvest Tab */}
                    <button onClick={Harvest} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative"><span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span><div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1"><GiCorn size={25} /></div><span className="text-xs text-blue-700 font-semibold">Harvest</span></button>
                </div>
                {/* Decorative background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-16 h-16 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-10 w-20 h-20 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-24 sm:h-24 bg-white/5 rounded-full blur-lg"></div>
                </div>

                <div className={`transform transition-all duration-1000 ease-out w-full max-w-2xl ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative w-full">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <form className="w-full max-w-2xl flex flex-col gap-4" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Left Column */}
                                    <div className="flex flex-col gap-4">
                                        <label className="text-xl font-bold text-gray-800">Patrol 1</label>
                                        <select
                                            name="patrol1"
                                            value={form.patrol1}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                        >
                                            <option value="Panther">Panther</option>
                                            <option value="Lion">Lion</option>
                                            <option value="Cobra">Cobra</option>
                                            <option value="Tiger">Tiger</option>
                                            <option value="Fox">Fox</option>
                                            <option value="Wolf">Wolf</option>
                                        </select>
                                        <label className="text-xl font-bold text-gray-800">Type 1</label>
                                        <select
                                            name="type1"
                                            value={form.type1}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                        >
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
                                        <label className="text-xl font-bold text-gray-800">Quantity 1</label>
                                        <input
                                            name="quantity1"
                                            type="number"
                                            value={form.quantity1}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                            placeholder="0"
                                        />
                                        <label className="text-xl font-bold text-gray-800">Source Land 1</label>
                                        <input
                                            name="SLand1"
                                            type="text"
                                            value={form.SLand1}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                            placeholder="1 - 33"
                                        />
                                        <label className="text-xl font-bold text-gray-800">Destination Land 1</label>
                                        <input
                                            name="DLand1"
                                            type="text"
                                            value={form.DLand1}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                            placeholder="1 - 33"
                                        />
                                    </div>
                                    {/* Right Column */}
                                    <div className="flex flex-col gap-4">
                                        <label className="text-xl font-bold text-gray-800">Patrol 2</label>
                                        <select
                                            name="patrol2"
                                            value={form.patrol2}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                        >
                                            <option value="Panther">Panther</option>
                                            <option value="Lion">Lion</option>
                                            <option value="Cobra">Cobra</option>
                                            <option value="Tiger">Tiger</option>
                                            <option value="Fox">Fox</option>
                                            <option value="Wolf">Wolf</option>
                                        </select>
                                        <label className="text-xl font-bold text-gray-800">Type 2</label>
                                        <select
                                            name="type2"
                                            value={form.type2}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                        >
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
                                        <label className="text-xl font-bold text-gray-800">Quantity 2</label>
                                        <input
                                            name="quantity2"
                                            type="number"
                                            value={form.quantity2}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                            placeholder="0"
                                        />
                                        <label className="text-xl font-bold text-gray-800">Source Land 2</label>
                                        <input
                                            name="SLand2"
                                            type="text"
                                            value={form.SLand2}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                            placeholder="1 - 33"
                                        />
                                        <label className="text-xl font-bold text-gray-800">Destination Land 2</label>
                                        <input
                                            name="DLand2"
                                            type="text"
                                            value={form.DLand2}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg mb-2"
                                            placeholder="1 - 33"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="mt-6 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-blue-600 transition w-full sm:w-[150px] mx-auto block text-center">Trade</button>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Trade