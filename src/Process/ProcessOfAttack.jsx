import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import { GrScorecard } from "react-icons/gr";
import { PiPlantBold } from "react-icons/pi";
import { GiEating } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";
import { MdLocalShipping } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';

function ProcessOfAttack() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { state } = useLocation();

    // State for the single soldier input field
    const [soldiers, setSoldiers] = useState(0);

    // New states for initialL and attackedL, initialized from route state or localStorage
    const [initialLandInput, setInitialLandInput] = useState(""); // Will be populated in useEffect
    const [attackedLandInput, setAttackedLandInput] = useState(""); // Will be populated in useEffect

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fade-in animation
        const timer = setTimeout(() => setIsVisible(true), 200);

        setUsername(localStorage.getItem("username") || "");
        document.title = "Process of Attack"; // Changed title to reflect component name

        // Retrieve land numbers from state or localStorage
        const storedInitialL = state?.landNo || localStorage.getItem("landNo") || "";
        const storedAttackedL = state?.attackedLand || localStorage.getItem("attackedLand") || "";

        // Set the state for the new input fields
        setInitialLandInput(storedInitialL);
        setAttackedLandInput(storedAttackedL);

        // Store land numbers in localStorage for persistence
        if (state?.landNo) localStorage.setItem("landNo", state.landNo);
        if (state?.attackedLand) localStorage.setItem("attackedLand", state.attackedLand);

        return () => clearTimeout(timer);
    }, [state]); // Depend on 'state' to update inputs if navigated with new state

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
                toast.info("Logged out successfully!", { position: "top-center" });
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (error) {
                console.error("Logout error:", error);
                toast.error("Logout failed on server.", { position: "top-center" });
            }
            localStorage.removeItem("username");
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const Home = () => { navigate('/cp'); setIsMobileMenuOpen(false); };
    const Buy = () => { navigate('/cp/buy'); setIsMobileMenuOpen(false); };
    const Plant = () => { navigate('/cp/plant'); setIsMobileMenuOpen(false); };
    const Feeding = () => { navigate('/cp/feeding'); setIsMobileMenuOpen(false); };
    const Attack = () => { navigate('/cp/attack'); setIsMobileMenuOpen(false); };
    const Transport = () => { navigate('/cp/transport'); setIsMobileMenuOpen(false); };
    const ViewScores = () => { navigate('/cp/scores'); setIsMobileMenuOpen(false); };

    // Handler for the single button with the three inputs
    const handleProcessAttack = async () => {
        // Validate land numbers from the new inputs
        if (!initialLandInput || !attackedLandInput) {
            toast.error("Please enter both initial and attacked land numbers.", { position: "top-center" });
            return;
        }

        // Basic validation for the soldier input
        if (soldiers <= 0) { // Changed to <= 0 as 0 soldiers might not be valid for attack
            toast.error("Please enter a positive number of soldiers.", { position: "top-center" });
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://projectrobin.onrender.com/CP/attack/kadr', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    initialL: Number(initialLandInput),
                    attackedL: Number(attackedLandInput),
                    soldiers: Number(soldiers),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Attack processing failed.', { position: 'top-center' });
                return;
            }

            toast.success(data.message || "Attack processed successfully!", { position: "top-center" });

            // Optionally reset inputs after successful processing
            setSoldiers(0);
            // You might want to keep the land numbers in the inputs or clear them based on UX
            // setInitialLandInput("");
            // setAttackedLandInput("");

            // Example: Navigate back to the main attack page after successful attack
            setTimeout(() => {
                navigate('/cp/attack');
            }, 1500);

        } catch (error) {
            console.error("Attack processing error:", error);
            toast.error("Failed to connect to server or process attack.", { position: "top-center" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* Horizontal Navbar - UI and functions unchanged */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-8 z-50 border-b border-blue-200">
                <span className="text-blue-700 font-bold text-sm sm:text-lg truncate max-w-[120px] sm:max-w-none capitalize"><span className='text-blue-700 font-bold text-sm sm:text-lg'>CP.</span>{username}</span>
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden p-2 rounded-md hover:bg-blue-50 transition"
                >
                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <button onClick={handleLogout} className="hidden lg:block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-xl shadow transition mr-20">Logout</button>
            </div>

            {/* Mobile Navigation Menu - UI and functions unchanged */}
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
                {/* Vertical Navbar - UI and functions unchanged */}
                <div className="hidden lg:flex fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex-col items-center mt-[63px] z-50 border-l border-blue-200 space-y-4">
                    <button onClick={Home} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    <button onClick={Buy} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Buy</span>
                    </button>
                    <button onClick={Plant} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiPlantBold size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Plant</span>
                    </button>
                    <button onClick={Feeding} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiEating size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Feeding</span>
                    </button>
                    <button onClick={Attack} className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <LuSwords size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack</span>
                    </button>
                    <button onClick={Transport} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <MdLocalShipping size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Transport</span>
                    </button>
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

                {/* Main Content Area */}
                <div className={`transform transition-all duration-1000 ease-out w-full max-w-3xl ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative w-full">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 mb-8 text-center">Prepare Your Attack!</h2>

                            {/* Input fields */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Initial Land Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="initial-land-input" className="block text-gray-700 font-bold text-lg sm:text-xl mb-2">Your Land Number</label>
                                    <input
                                        id="initial-land-input"
                                        type="number"
                                        min={1}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg sm:text-xl"
                                        placeholder="e.g., 1"
                                        value={initialLandInput}
                                        onChange={(e) => setInitialLandInput(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Attacked Land Input */}
                                <div className="flex flex-col">
                                    <label htmlFor="attacked-land-input" className="block text-gray-700 font-bold text-lg sm:text-xl mb-2">Attacked Land Number</label>
                                    <input
                                        id="attacked-land-input"
                                        type="number"
                                        min={1}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg sm:text-xl"
                                        placeholder="e.g., 5"
                                        value={attackedLandInput}
                                        onChange={(e) => setAttackedLandInput(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                {/* Soldiers Input (spanning full width on smaller screens) */}
                                <div className="flex flex-col md:col-span-2">
                                    <label htmlFor="soldiers-input" className="block text-gray-700 font-bold text-lg sm:text-xl mb-2">Number of Soldiers</label>
                                    <input
                                        id="soldiers-input"
                                        type="number"
                                        min={0}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg sm:text-xl"
                                        placeholder="e.g., 1000"
                                        value={soldiers}
                                        onChange={(e) => setSoldiers(Number(e.target.value))}
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Attack button */}
                            <button
                                onClick={handleProcessAttack}
                                disabled={loading}
                                className={`mt-4 font-semibold px-10 py-3 rounded-lg shadow text-lg transition ${
                                    loading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                }`}
                            >
                                {loading ? 'Processing Attack...' : 'Initiate Attack!'}
                            </button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default ProcessOfAttack;