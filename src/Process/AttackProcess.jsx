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

function AttackProcess() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [attackData, setAttackData] = useState({
        initialLand: null,
        attackedLand: null,
        patrol1: "",
        patrol2: "",
        soldiers1: 0,
        soldiers2: 0,
        land1 : 0,
        land2 : 0,
        resources: {
            houses: 0,
            appleSoils: 0,
            watermelonSoils: 0,
            wheatSoils: 0,
            emptySoils: 0,
            wheat: 0,
            apple: 0,
            watermelon: 0
        }
    });
    const [soldiers, setSoldiers] = useState(0);
    
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);

        // Retrieve username from localStorage
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }

        // Fetch attack data when component mounts
        fetchAttackData();

        // favicon
        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/Attack.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Attack Process";
    }, []);

    const fetchAttackData = async () => {
        try {
            setLoading(true);
            const response = await fetch('https://projectrobin.onrender.com/CP/patrolAttack', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initialLandNo: 1,
                    finalLandNo: 2
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch attack data');
            }

            const data = await response.json();
            setAttackData({
                initialLand: data.patrol1,
                attackedLand: data.patrol2,
                patrol1: data.patrol1,
                patrol2: data.patrol2,
                soldiers1: data.soldiers1,
                soldiers2: data.soldiers2,
                resources: data.resources,
                land1: data.land1,
                land2: data.land2
            });
        } catch (error) {
            console.error('Error fetching attack data:', error);
            toast.error("Failed to load attack data", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    const getMinRequiredSoldiers = () => {
        // Example: require at least 20% of enemy soldiers
        return Math.ceil(attackData.soldiers2 + 2);
    };

    const getMaxAvailableSoldiers = () => {
        return attackData.soldiers1;
    };

    const isAttackPossible = () => {
        return soldiers >= getMinRequiredSoldiers() && soldiers <= getMaxAvailableSoldiers();
    };

    const handleAttackSubmit = async () => {
        if (!isAttackPossible()) {
            toast.warn("Invalid number of soldiers for attack", { position: "top-center" });
            return;
        }
    
        try {
            setLoading(true);
            const response = await fetch('https://projectrobin.onrender.com/CP/attack', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    initialL: attackData.land1,
                    attackedL: attackData.land2,
                    attackedPatrol: attackData.patrol2,
                    soldiers: soldiers
                })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Attack failed");
            }
    
            toast.success(data.message || "Attack successful!", { position: "top-center" });
            setTimeout(() => {
                navigate('/cp');
            }, 1500);

        } catch (error) {
            console.error('Attack failed:', error);
            toast.error(error.message || "Attack failed", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

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
            } catch (error) {
                console.error('Logout error:', error);
                toast.error("Logout failed on server.", { position: "top-center" });
            }
            localStorage.removeItem("username");
            toast.info("Logged out successfully!", { position: "top-center" });
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Navigation functions (close mobile menu on nav)
    const Home = () => { navigate('/cp'); setIsMobileMenuOpen(false); };
    const Buy = () => { navigate('/cp/buy'); setIsMobileMenuOpen(false); };
    const Plant = () => { navigate('/cp/plant'); setIsMobileMenuOpen(false); };
    const Feeding = () => { navigate('/cp/feeding'); setIsMobileMenuOpen(false); };
    const Attack = () => { navigate('/cp/attack'); setIsMobileMenuOpen(false); };
    const Transport = () => { navigate('/cp/transport'); setIsMobileMenuOpen(false); };
    const ViewScores = () => { navigate('/cp/scores'); setIsMobileMenuOpen(false); };

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
                        <button onClick={Buy} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg><span className="font-semibold">Buy</span></button>
                        <button onClick={Plant} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><PiPlantBold className="w-5 h-5 mr-3" /><span className="font-semibold">Plant</span></button>
                        <button onClick={Feeding} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GiEating className="w-5 h-5 mr-3" /><span className="font-semibold">Feeding</span></button>
                        <button onClick={Attack} className="flex items-center px-6 py-3 text-blue-700 bg-blue-50 transition"><LuSwords className="w-5 h-5 mr-3" /><span className="font-semibold">Attack</span></button>
                        <button onClick={Transport} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><MdLocalShipping className="w-5 h-5 mr-3" /><span className="font-semibold">Transport</span></button>
                        <button onClick={ViewScores} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><GrScorecard className="w-5 h-5 mr-3" /><span className="font-semibold">View Scores</span></button>
                        <button onClick={handleLogout} className="flex items-center px-6 py-3 text-red-600 hover:bg-red-50 transition mt-2 border-t border-gray-100"><svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg><span className="font-semibold">Logout</span></button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-4 sm:p-8 lg:p-20 pt-20 lg:pt-20">
                {/* Vertical Navbar - hidden on mobile */}
                <div className="hidden lg:flex fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex-col items-center mt-[63px] z-50 border-l border-blue-200 space-y-4">
                    {/* Home Tab */}
                    <button onClick={Home} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* Buy Tab */}
                    <button onClick={Buy} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Buy</span>
                    </button>
                     {/* Plant Tab */}
                    <button onClick={Plant} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiPlantBold size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Plant</span>
                    </button>
                    {/* Feeding Tab */}
                    <button onClick={Feeding} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiEating size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Feeding</span>
                    </button>
                    {/* Attack Tab */}
                    <button onClick={Attack} className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <LuSwords size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack</span>
                    </button>
                    {/* Transport Tab */}
                    <button onClick={Transport} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <MdLocalShipping size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Transport</span>
                    </button>
                    {/* View Scores Tab */}
                    <button onClick={ViewScores} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
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
                            {/* Custom Attack UI - VS layout */}
                            <div className="w-full flex flex-col items-center justify-center gap-8">
                                <div className="w-full flex flex-col sm:flex-row justify-between items-start gap-8">
                                    {/* Left side: Your land */}
                                    <div className="flex-1 flex flex-col items-center sm:items-start">
                                        <div className="text-gray-700 text-lg font-medium mb-2">the number of soldiers in your land</div>
                                        <div className="text-3xl font-bold text-gray-800 mb-2">
                                            {attackData.soldiers1}
                                        </div>
                                        <div className="text-2xl font-semibold text-gray-700 mb-4">
                                            {attackData.patrol1}
                                        </div>
                                        <div className="text-gray-700 text-base font-medium mb-1">the resources of the land :</div>
                                        <div className="ml-2 text-gray-700 text-base font-normal">
                                            <span>houses: {attackData.resources.houses}</span><br />
                                            <span>apple soil: {attackData.resources.appleSoils}</span><br />
                                            <span>watermelon soil: {attackData.resources.watermelonSoils}</span><br />
                                            <span>wheat soil: {attackData.resources.wheatSoils}</span><br />
                                            <span>empty soil: {attackData.resources.emptySoils}</span>
                                        </div>
                                    </div>
                                    {/* Center VS */}
                                    <div className="flex flex-col items-center justify-center mx-4 my-4">
                                        <div className="text-5xl font-extrabold text-gray-700 mb-2">VS</div>
                                    </div>
                                    {/* Right side: Attacked land */}
                                    <div className="flex-1 flex flex-col items-center sm:items-end">
                                        <div className="text-gray-700 text-lg font-medium mb-2">the number of soldiers in the attacked land</div>
                                        <div className="text-3xl font-bold text-gray-800 mb-2">
                                            {attackData.soldiers2}
                                        </div>
                                        <div className="text-2xl font-semibold text-gray-700 mb-4">
                                            {attackData.patrol2}
                                        </div>
                                        <div className="text-2xl font-semibold text-gray-700 mb-4">
                                        Starting Land No: {attackData.land1}
                                        </div>
                                        <div className="text-2xl font-semibold text-gray-700 mb-4">
                                        Finishing Land No {attackData.land2}
                                        </div>
                                    </div>
                                </div>
 
                                {/* Soldiers input */}
                                <div className="w-full max-w-md">
                                    <label className="block text-gray-700 text-lg font-medium mb-2 text-center">
                                        Number of soldiers to attack with:
                                    </label>
                                    <input
                                        type="number"
                                        min={getMinRequiredSoldiers()}
                                        max={getMaxAvailableSoldiers()}
                                        value={soldiers}
                                        onChange={(e) => setSoldiers(Number(e.target.value))}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg text-center"
                                        placeholder={`Min: ${getMinRequiredSoldiers()}, Max: ${getMaxAvailableSoldiers()}`}
                                    />
                                    {/* Attack requirements info */}
                                    <div className="mt-3 text-sm text-gray-600 text-center">
                                        <div>Minimum required: {getMinRequiredSoldiers()} soldiers</div>
                                        <div>Maximum available: {getMaxAvailableSoldiers()} soldiers</div>
                                        {!isAttackPossible() && (
                                            <div className="text-red-600 font-medium mt-1">
                                                ⚠️ You need at least {getMinRequiredSoldiers()} soldiers to attack this land
                                            </div>
                                        )}
                                    </div>
                                </div>
                               
                                {/* Attack button */}
                                <button
                                    type='submit'
                                    onClick={handleAttackSubmit}
                                    disabled={loading}
                                    className="mt-4 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-semibold px-10 py-3 rounded-lg shadow text-lg transition"
                                >
                                    {loading ? 'Attacking...' : 'Attack'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default AttackProcess;