import React, { useEffect, useState } from 'react';
import '../Scout/tailwind.css';
import { GrScorecard } from "react-icons/gr";
import { PiPlantBold } from "react-icons/pi";
import { GiEating } from "react-icons/gi";
import { LuSwords } from "react-icons/lu";
import { MdLocalShipping } from 'react-icons/md';
import imageDefault from '../assets/image.PNG';
import { getSharedImage } from '../utils/sharedImage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Transport() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [image, setImage] = useState(() => getSharedImage(imageDefault));
    const [initialLandNo, setInitialLandNo] = useState(() => {
        const stored = localStorage.getItem("initialLandNo");
        return stored ? Number(stored) : 0;
    });
    const [finalLandNo, setFinalLandNo] = useState(() => {
        const stored = localStorage.getItem("finalLandNo");
        return stored ? Number(stored) : 0;
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);

        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
            setUsername(storedUsername);
        }

        const storedInitialLand = localStorage.getItem("initialLandNo");
        const storedFinalLand = localStorage.getItem("finalLandNo");
        if (storedInitialLand) {
            setInitialLandNo(Number(storedInitialLand));
        }
        if (storedFinalLand) {
            setFinalLandNo(Number(storedFinalLand));
        }

        const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/Transport.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (initialLandNo !== 0) {
            localStorage.setItem("initialLandNo", initialLandNo.toString());
        }
    }, [initialLandNo]);

    useEffect(() => {
        if (finalLandNo !== 0) {
            localStorage.setItem("finalLandNo", finalLandNo.toString());
        }
    }, [finalLandNo]);

    useEffect(() => {
        document.title = "Transport";
    }, []);

    useEffect(() => {
        const onStorage = () => setImage(getSharedImage(imageDefault));
        window.addEventListener('storage', onStorage);
        return () => {
            window.removeEventListener('storage', onStorage);
        };
    }, []);

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

    const Home = () => { navigate('/cp'); setIsMobileMenuOpen(false); };
    const Buy = () => { navigate('/cp/buy'); setIsMobileMenuOpen(false); };
    const Plant = () => { navigate('/cp/plant'); setIsMobileMenuOpen(false); };
    const Feeding = () => { navigate('/cp/feeding'); setIsMobileMenuOpen(false); };
    const Attack = () => { navigate('/cp/attack'); setIsMobileMenuOpen(false); };
    const ViewScores = () => { navigate('/cp/scores'); setIsMobileMenuOpen(false); };

    const handleTransportSubmit = async (e) => {
        e.preventDefault();
        setResult(null);

        const initial = Number(initialLandNo);
        const final = Number(finalLandNo);
        if (
            isNaN(initial) || isNaN(final) ||
            initial < 1 || initial > 33 ||
            final < 1 || final > 33
        ) {
            toast.error("Land numbers must be between 1 and 33.", { position: "top-center" });
            return;
        }
        setLoading(true);

        try {
            const res = await fetch('https://projectrobin.onrender.com/CP/transport', {
                method: 'PATCH',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    initialLandNo: initial,
                    finalLandNo: final
                }),
            });
            if (!res.ok) {
                throw new Error("Failed to get resources for lands.");
            }
            const data = await res.json();
            setResult(data);
            
        } catch {
            toast.error("Error connecting to server.", { position: "top-center" });
        }
        setLoading(false);
    };

    function navigateTransportProcess() {
        if (result) {
            toast.success('Go To Process', { position: "top-center" });
        }
            else {
                toast.error('Error to Submit', { position: "top-center" })
            }

        // Save to localStorage
        localStorage.setItem('transportFormData', JSON.stringify({
            initialLand: initialLandNo,
            finalLand: finalLandNo,
        }));

        // Navigate with state
        navigate('/cp/TransportProcess', {
            state: {
                initialLand: initialLandNo,
                finalLand: finalLandNo,
            }
        });
    }
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
                        <button onClick={Attack} className="flex items-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition"><LuSwords className="w-5 h-5 mr-3" /><span className="font-semibold">Attack</span></button>
                        <button className="flex items-center px-6 py-3 text-blue-700 bg-blue-50 transition"><MdLocalShipping className="w-5 h-5 mr-3" /><span className="font-semibold">Transport</span></button>
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
                    <button onClick={Attack} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <LuSwords size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack</span>
                    </button>
                    {/* Transport Tab */}
                    <button className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
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

                <div className={`transform transition-all duration-1000 ease-out w-full max-w-2xl ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                    }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative w-full">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                        <div className="relative z-10 flex flex-col items-center w-full">
                            <form className="w-full max-w-xl flex flex-col gap-4" onSubmit={handleTransportSubmit}>
                                {/* Transport Land Number */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <label htmlFor="transport-land-label" className="block bg-gray-700 font-bold text-lg sm:text-2xl mb-2 whitespace-nowrap text-white px-1 py-2 rounded-lg shadow-sm text-center">Starting Land Number</label>
                                    <input
                                        id="transport-land-label"
                                        type="number"
                                        value={initialLandNo}
                                        onChange={(e) => setInitialLandNo(Number(e.target.value))}
                                        className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg flex-1 w-full max-w-md"
                                        placeholder="must be from 1 - 33"
                                    />
                                </div>
                                {/* Transport Target Number */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <label htmlFor="transport-target-label" className="block bg-gray-700 font-bold text-lg sm:text-2xl mb-2 whitespace-nowrap text-white px-1 py-2 rounded-lg shadow-sm text-center">Final Land Number</label>
                                    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                                        <input
                                            id="transport-target-label"
                                            type="number"
                                            value={finalLandNo}
                                            onChange={(e) => setFinalLandNo(Number(e.target.value))}
                                            className="px-4 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-400 bg-gray-50 text-lg flex-1"
                                            placeholder="must be from 1 - 33"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl shadow transition w-full sm:w-auto"
                                    >
                                        {loading ? "Submitting..." : "Submit"}
                                    </button>
                                </div>
                            </form>
                        {/* Show results */}
                        {result && (
    <div className="mt-6 w-full bg-blue-50 rounded-xl p-4 shadow text-blue-900 text-sm space-y-6">
        {/* Starting Land Resources */}
        <div>
            <h3 className="font-bold mb-2 text-blue-700">Resources for Land {initialLandNo}:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {Object.entries(result.starting).map(([key, value]) => (
                    <li key={key}><span className="font-semibold capitalize">{key}:</span> {value}</li>
                ))}
            </ul>
        </div>

        {/* Final Land Resources */}
        <div>
            <h3 className="font-bold mb-2 text-blue-700">Resources for Land {finalLandNo}:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
                {Object.entries(result.finishing).map(([key, value]) => (
                    <li key={key}><span className="font-semibold capitalize">{key}:</span> {value}</li>
                ))}
            </ul>
        </div>

        {/* Horses and Carts */}
        <div>
            <h3 className="font-bold mb-2 text-blue-700">Horse and Carts:</h3>
            <ul className="list-disc list-inside space-y-1 pl-4">
                <li><span className="font-semibold">Horses:</span> {result.horses}</li>
                <li><span className="font-semibold">Rented Horses:</span> {result.rentHorses}</li>
                <li><span className="font-semibold">Carts:</span> {result.carts}</li>
                <li><span className="font-semibold">Rented Carts:</span> {result.rentCarts}</li>
            </ul>
        </div>
    </div>
)}
                                    <button
                                        type="submit"
                                        onClick={navigateTransportProcess}
                                        disabled={loading}
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 sm:px-6 py-3 rounded-xl shadow transition w-full sm:w-auto mt-10"
                                    >
                                        Go to Process
                                    </button>
                        </div>
                        {/* Image below the form, inside the same container */}
                        <div className="flex flex-col items-center mt-6 sm:mt-8">
                            <img src={image} alt="Transport Visual" className="w-full max-w-[700px] h-auto sm:h-[400px] object-cover rounded-xl shadow-lg" />
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default Transport