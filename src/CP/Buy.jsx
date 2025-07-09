import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import { GrScorecard } from "react-icons/gr";
import { PiPlantBold } from "react-icons/pi";
import { GiEating } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";
import { MdLocalShipping } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Buy() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [type, setType] = useState('horse');
    const [cost, setCost] = useState(' ');
    const [coins, setCoins] = useState(' ');
    const [landNo, setLandNo] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState('horse');
    const navigate = useNavigate();

    // Navigation functions (close mobile menu on nav)
    const Home = () => { setIsMobileMenuOpen(false); };
    const Plant = () => { setIsMobileMenuOpen(false); };
    const Feeding = () => { setIsMobileMenuOpen(false); };
    const Attack = () => { setIsMobileMenuOpen(false); };
    const Transport = () => { setIsMobileMenuOpen(false); };
    const ViewScores = () => { setIsMobileMenuOpen(false); };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

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
        link.href = '/Buy.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchCostAndCoins = async () => {
            if (!quantity || !type) return;
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:3000/CP/buy`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity, type }),
                });
    
                if (res.ok) {
                    const data = await res.json();
                    setCost(data.cost);
                    setCoins(data.coins);
                } else {
                    setCost('empty');
                    setCoins('empty');
                }
            } catch {
                setCost('empty');
                setCoins('empty');
            } finally {
                setLoading(false);
            }
        };
        fetchCostAndCoins();
    }, [quantity, type]);
    
    useEffect(() => {
        document.title = "Buy";
    }, []);

    // Navigate
    function HomeNav() {
        navigate('/cp');
    }

    function PlantNav() {
        navigate('/cp/plant');
    }

    function FeedingNav() {
        navigate('/cp/feeding');
    }

    function AttackNav() {
        navigate('/cp/attack');
    }

    function TransportNav() {
        navigate('/cp/transport');
    }

    function ScoresNav() {
        navigate('/cp/scores');
    }

    const handleLogout = async () => {
            if (window.confirm("Are you sure you want to logout?")) {
                try {
                    // Call backend logout endpoint
                    await fetch('http://localhost:3000/authen/signout', {
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

    // Handle form submit
    const handleBuy = async (e) => {
        e.preventDefault();
        if (!quantity || !type || !landNo || Number(landNo) < 0 || Number(landNo) > 33) {
            toast.error("Please enter a valid Land Number (1 - 33).", { position: "top-center" });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/CP/buy', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity: Number(quantity),
                    type,
                    landNo: Number(landNo),
                }),
            });
    
            const data = await res.json();
            if (res.ok) {
                toast.success(data.message || "Purchase successful!", { position: "top-center" });
                setQuantity(0);
                setType(' ');
                setLandNo(0);
            } else {
                toast.error(data.message || "Purchase failed.", { position: "top-center" });
            }
        } catch {
            toast.error("Network error.", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const selected = e.target.value;
        setSelectedOption(selected);
        setType(selected);
    };

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-8 z-50 border-b border-blue-200">
                <span className="text-blue-700 font-bold text-sm sm:text-lg truncate max-w-[120px] sm:max-w-none capitalize"><span className='text-blue-700 font-bold text-sm sm:text-lg'>CP.</span>{username}</span>
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
                        {/* Active Buy Tab */}
                        <button className="flex items-center px-6 py-3 text-blue-700 bg-blue-50 transition"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg><span className="font-semibold">Buy</span></button>
                        <button onClick={Plant} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><PiPlantBold className="w-5 h-5 mr-3" /><span className="font-semibold">Plant</span></button>
                        <button onClick={Feeding} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GiEating className="w-5 h-5 mr-3" /><span className="font-semibold">Feeding</span></button>
                        <button onClick={Attack} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><LuSwords className="w-5 h-5 mr-3" /><span className="font-semibold">Attack</span></button>
                        <button onClick={Transport} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><MdLocalShipping className="w-5 h-5 mr-3" /><span className="font-semibold">Transport</span></button>
                        <button onClick={ViewScores} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GrScorecard className="w-5 h-5 mr-3" /><span className="font-semibold">View Scores</span></button>
                        <button onClick={handleLogout} className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition mt-2 border-t border-gray-100"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg><span className="font-semibold">Logout</span></button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-4 sm:p-8 lg:p-20 pt-20 lg:pt-20">
                {/* Vertical Navbar - hidden on mobile */}
                <div className="hidden lg:flex fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex-col items-center mt-[63px] z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button onClick={HomeNav} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* Buy Tab */}
                    <button className="w-full flex flex-col items-center py-4 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Buy</span>
                    </button>
                    {/* Plant Tab */}
                    <button onClick={PlantNav} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiPlantBold size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Plant</span>
                    </button>
                    {/* Feeding Tab */}
                    <button onClick={FeedingNav} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiEating size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Feeding</span>
                    </button>
                    {/* Attack Tab */}
                    <button onClick={AttackNav} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <LuSwords size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack</span>
                    </button>
                    {/* Transport Tab */}
                    <button onClick={TransportNav} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <MdLocalShipping size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Transport</span>
                    </button>
                    {/* View Scores Tab */}
                    <button onClick={ScoresNav} className="w-full flex flex-col items-center py-4 px-2 group hover:bg-blue-50 transition relative">
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

                <div className={`transform transition-all duration-1000 ease-out w-full max-w-2xl ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative w-full">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <form className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleBuy}>
                                {/* Left Column */}
                                <div className="flex flex-col gap-4">
                                {/* Quantity */}
                                <div>
                                    <label htmlFor="buy-quantity-input" className="block text-white bg-gray-700 font-bold text-xl sm:text-2xl mb-2 rounded-lg px-2 py-1 w-32">Quantity</label>
                                    <input
                                    id="buy-quantity-input"
                                    type="number"
                                    min={1}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg sm:text-xl"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    disabled={loading}
                                    />
                                </div>
                                {/* Cost */}
                                <div>
                                    <label htmlFor="buy-cost-label" className="block text-white bg-gray-700 font-bold text-xl sm:text-2xl mb-2 rounded-lg px-2 py-1 w-20">Cost</label>
                                    <input
                                    id="buy-cost-label"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 cursor-not-allowed text-lg sm:text-xl"
                                    value={loading ? 'Loading...' : cost}
                                    disabled
                                    />
                                </div>
                                {/* Your Coins */}
                                <div>
                                    <label htmlFor="buy-coins-label" className="block text-white bg-gray-700 font-bold text-xl sm:text-2xl mb-2 rounded-lg px-2 py-1 w-36">Your Coins</label>
                                    <input
                                    id="buy-coins-label"
                                    type="text"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 cursor-not-allowed text-lg sm:text-xl"
                                    value={loading ? 'Loading...' : coins}
                                    disabled={loading}
                                    />
                                </div>
                                {/* Land Number */}
                                <div>
                                    <label htmlFor="buy-land-label" className="block text-white bg-gray-700 font-bold text-xl sm:text-2xl mb-2 rounded-lg px-2 py-1 w-44">Land Number</label>
                                    <input
                                    id="buy-land-label"
                                    type="number"
                                    min={0}
                                    max={33}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg sm:text-xl"
                                    placeholder="must be from 1 - 33"
                                    value={landNo}
                                    onChange={e => setLandNo(e.target.value)}
                                    disabled={loading}
                                    />
                                </div>
                                </div>
                                {/* Right Column */}
                                <div className="flex flex-col gap-4 justify-center">
                                {/* Type */}
                                <div >
                                    <label htmlFor="buy-type-select" className="block text-white bg-gray-700 font-bold text-xl sm:text-2xl mb-2 rounded-lg px-2 py-1 w-20">Type</label>
                                    <select
                                        id="buy-type-select"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg sm:text-xl"
                                        value={selectedOption}  // or value={type} – both are in sync
                                        onChange={handleChange}
                                        disabled={loading}
                                        >
                                        <option value="horse">Horse</option>
                                        <option value="cart">Cart</option>
                                        <option value="apple">Apple Crop</option>
                                        <option value="wheat">Wheat Crop</option>
                                        <option value="watermelon">Watermelon Crop</option>
                                        <option value="appleSeeds">Apple Seeds</option>
                                        <option value="wheatSeeds">Wheat Seeds</option>
                                        <option value="watermelonSeeds">Watermelon Seeds</option>
                                        <option value="soldier">Soldiers</option>
                                        <option value="rentCart">Rent Cart</option>
                                        <option value="rentHorse">Rent Horse</option>
                                        <option value="workshop">Workshop</option>
                                        <option value="house">House</option>
                                        <option value="soil">Soil</option>
                                        </select>
                                </div>
                                </div>
                                {/* Responsive Submit Button */}
                                <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
                                    <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow hover:bg-blue-600 transition w-full sm:w-[150px] text-center" disabled={loading}>{loading ? 'Processing...' : 'Buy'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Buy