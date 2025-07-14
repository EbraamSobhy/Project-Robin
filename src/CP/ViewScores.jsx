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

function ViewScores() {
    const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [patrols, setPatrols] = useState([]);
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Patrol names based on the dropdown options found in other components
    const patrolNames = ['Lion', 'Panther', 'Cobra', 'Wolf', 'Fox', 'Tiger'];

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
        link.href = '/Score.png';
        document.getElementsByTagName('head')[0].appendChild(link);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.title = "Scores";
    }, []);

    // Fetch data from MongoDB
    useEffect(() => {
        const fetchScores = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const response = await fetch('http://localhost:3000/scout/view-scores', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Response data:', data);
                
                // Handle different response formats
                if (data && typeof data === 'object') {
                    let patrolsArray = [];
                    
                    // Check if data has patrol1, patrol2, etc. structure
                    if (data.patrol1 || data.patrol2 || data.patrol3 || data.patrol4 || data.patrol5 || data.patrol6) {
                        for (let i = 1; i <= 6; i++) {
                            const patrolKey = `patrol${i}`;
                            if (data[patrolKey]) {
                                patrolsArray.push({
                                    ...data[patrolKey],
                                    patrolName: data[patrolKey].patrolName || patrolNames[i-1]
                                });
                            } else {
                                // Add empty patrol with default name
                                patrolsArray.push({
                                    patrolName: patrolNames[i-1],
                                    totalSoldiers: 0,
                                    totalHouses: 0,
                                    totalCarts: 0,
                                    totalWorkshops: 0,
                                    totalLands: 0,
                                    totalHorses: 0,
                                    totalCoins: 0,
                                    rentHorses: 0,
                                    rentCarts: 0,
                                    wheatSeeds: 0,
                                    appleSeeds: 0,
                                    watermelonSeeds: 0,
                                    watermelon: 0,
                                    apple: 0,
                                    wheat: 0,
                                    totalSoil: 0,
                                    appleSoil: 0,
                                    watermelonSoil: 0,
                                    wheatSoil: 0,
                                    emptySoil: 0
                                });
                            }
                        }
                    }
                    // Check if data is an array of patrols
                    else if (Array.isArray(data)) {
                        patrolsArray = data.map((patrol, index) => ({
                            ...patrol,
                            patrolName: patrol.patrolName || patrolNames[index] || `Patrol ${index + 1}`
                        }));
                    }
                    // Check if data has a patrols property
                    else if (data.patrols && Array.isArray(data.patrols)) {
                        patrolsArray = data.patrols.map((patrol, index) => ({
                            ...patrol,
                            patrolName: patrol.patrolName || patrolNames[index] || `Patrol ${index + 1}`
                        }));
                    }
                    // If no patrol data found, create default patrols
                    else {
                        patrolsArray = patrolNames.map(name => ({
                            patrolName: name,
                            totalSoldiers: 0,
                            totalHouses: 0,
                            totalCarts: 0,
                            totalWorkshops: 0,
                            totalLands: 0,
                            totalHorses: 0,
                            totalCoins: 0,
                            rentHorses: 0,
                            rentCarts: 0,
                            wheatSeeds: 0,
                            appleSeeds: 0,
                            watermelonSeeds: 0,
                            watermelon: 0,
                            apple: 0,
                            wheat: 0,
                            totalSoil: 0,
                            appleSoil: 0,
                            watermelonSoil: 0,
                            wheatSoil: 0,
                            emptySoil: 0
                        }));
                    }
                    
                    setPatrols(patrolsArray);
                    setLands(data.lands || data.land || []);
                    
                } else {
                    throw new Error('Invalid data format received from server');
                }
            } catch (error) {
                console.error('Error fetching scores:', error);
                setError(error.message);
                
                // If backend is not available, create default patrols with sample data
                const defaultPatrols = patrolNames.map((name, index) => ({
                    patrolName: name,
                    totalSoldiers: Math.floor(Math.random() * 10) + 1 + index,
                    totalHouses: Math.floor(Math.random() * 5) + 1 + index,
                    totalCarts: Math.floor(Math.random() * 4) + 1 + index,
                    totalWorkshops: Math.floor(Math.random() * 3) + 1 + index,
                    totalLands: Math.floor(Math.random() * 6) + 1 + index,
                    totalHorses: Math.floor(Math.random() * 8) + 1 + index,
                    totalCoins: Math.floor(Math.random() * 100) + 10 + (index * 10),
                    rentHorses: Math.floor(Math.random() * 3) + index,
                    rentCarts: Math.floor(Math.random() * 2) + index,
                    wheatSeeds: Math.floor(Math.random() * 10) + 1 + index,
                    appleSeeds: Math.floor(Math.random() * 8) + 1 + index,
                    watermelonSeeds: Math.floor(Math.random() * 12) + 1 + index,
                    watermelon: Math.floor(Math.random() * 15) + 1 + index,
                    apple: Math.floor(Math.random() * 20) + 1 + index,
                    wheat: Math.floor(Math.random() * 25) + 1 + index,
                    totalSoil: Math.floor(Math.random() * 20) + 5 + index,
                    appleSoil: Math.floor(Math.random() * 8) + 1 + index,
                    watermelonSoil: Math.floor(Math.random() * 10) + 1 + index,
                    wheatSoil: Math.floor(Math.random() * 12) + 1 + index,
                    emptySoil: Math.floor(Math.random() * 5) + 1 + index
                }));
                
                setPatrols(defaultPatrols);
                setLands([]);
                
                toast.warning('Backend not available. Showing sample data.', { position: "top-center" });
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
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

    // Navigation functions
    const Home = () => {
        navigate('/cp');
    }

    const Buy = () => {
        navigate('/cp/buy');
    }

    const Plant = () => {
        navigate('/cp/plant');
    }

    const Feeding = () => {
        navigate('/cp/feeding');
    }

    const Attack = () => {
        navigate('/cp/attack');
    }

    const Transport = () => {
        navigate('/cp/transport');
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to render patrol data
    const renderPatrolData = (patrol) => {
        if (!patrol) return null;
        
        const patrolInfo = [
            { label: "💂 Total Soldiers", value: patrol.tot_sol || 0 },
            { label: "🏘️ Total Houses", value: patrol.tot_houses || 0 },
            { label: "🏇 Total Carts", value: patrol.tot_carts || 0 },
            { label: "🛠️ Total Workshops", value: patrol.tot_workshops || 0 },
            { label: "🏞️ Total Lands", value: patrol.tot_lands || 0 },
            { label: "🐎 Total Horses", value: patrol.tot_horses || 0 },
            { label: "💰 Total Coins", value: patrol.coins || 0 },
            { label: "🐎 Rent Horses", value: patrol.rentHorse || 0 },
            { label: "🏇 Rent Carts", value: patrol.rentCart || 0 },
            { label: "🌾 Wheat Seeds", value: patrol.wheatSeeds || 0 },
            { label: "🍎 Apple Seeds", value: patrol.appleSeeds || 0 },
            { label: "🍉 Watermelon Seeds", value: patrol.watermelonSeeds || 0 },
            { label: "🍉 Watermelon", value: patrol.watermelon || 0 },
            { label: "🍎 Apple", value: patrol.apple || 0 },
            { label: "🌾 Wheat", value: patrol.wheat || 0 },
            { label: "🌱 Total Soil", value: patrol.tot_soil || 0 },
            { label: "🍎 Apple Soil", value: patrol.soils.apple || 0 },
            { label: "🍉 Watermelon Soil", value: patrol.soils.watermelon || 0 },
            { label: "🌾 Wheat Soil", value: patrol.soils.wheat || 0 },
            { label: "⬜ Empty Soil", value: patrol.soils.empty || 0 },
        ];

        return patrolInfo.map((item, i) => (
            <div key={i} className="py-0.5 text-xs sm:text-sm">
                {item.label}: {item.value}
            </div>
        ));
    };

    // Function to render land data
    const renderLandData = (land, idx) => {
        if (!land) return null;
        
        const landInfo = [
            { label: "Land Number", value: land.landNumber || idx + 1 },
            { label: "Houses", value: land.houses || 0 },
            { label: "Workshops", value: land.workshops || 0 },
            { label: "Soil", value: land.soil || 0 },
            { label: "Crops", value: land.crops || 0 },
        ];

        return landInfo.map((item, i) => (
            <div key={i} className="py-0.5 text-xs sm:text-sm">
                {item.label}: {item.value}
            </div>
        ));
    };

    return (
        <>
            {/* Horizontal Navbar */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow flex items-center justify-between px-4 sm:px-8 z-50 border-b border-blue-200">
                {/* Username on the left */}
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
                        <button 
                            onClick={Home}
                            className="flex items-center justify-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full text-center"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                            </svg>
                            <span className="font-semibold">Home</span>
                        </button>
                        <button 
                            onClick={Buy}
                            className="flex items-center justify-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full text-center"
                        >
                            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                            <span className="font-semibold">Buy</span>
                        </button>
                        <button 
                            onClick={Plant}
                            className="flex items-center justify-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full text-center"
                        >
                            <PiPlantBold className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Plant</span>
                        </button>
                        <button 
                            onClick={Feeding}
                            className="flex items-center justify-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full text-center"
                        >
                            <GiEating className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Feeding</span>
                        </button>
                        <button 
                            onClick={Attack}
                            className="flex items-center justify-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full text-center"
                        >
                            <LuSwords className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Attack</span>
                        </button>
                        <button 
                            onClick={Transport}
                            className="flex items-center justify-center px-6 py-3 text-blue-700 hover:bg-blue-50 transition w-full text-center"
                        >
                            <MdLocalShipping className="w-5 h-5 mr-3" />
                            <span className="font-semibold">Transport</span>
                        </button>
                        <button 
                            className="flex items-center justify-center px-6 py-3 text-blue-700 bg-blue-50 transition text-center"
                        >
                            <GrScorecard className="w-5 h-5 mr-3" />
                            <span className="font-semibold">View Scores</span>
                        </button>
                        <button 
                            onClick={handleLogout}
                            className="flex items-center justify-center px-6 py-3 text-red-600 hover:bg-red-50 transition mt-2 border-t border-gray-100 w-full text-center"
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
                <div className="hidden lg:flex fixed top-0 right-0 h-full w-24 bg-white shadow-lg flex-col items-center py-8 mt-[63px] space-y-7 z-50 border-l border-blue-200">
                    {/* Home Tab */}
                    <button onClick={Home} className="w-full flex flex-col items-center px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <svg className="w-7 h-7 text-blue-500 mb-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
                        <span className="text-xs text-blue-700 font-semibold">Home</span>
                    </button>
                    {/* Buy Tab */}
                    <button onClick={Buy} className="w-full flex flex-col items-center px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Buy</span>
                    </button>
                    {/* Plant Tab */}
                    <button onClick={Plant} className="w-full flex flex-col items-center px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiPlantBold size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Plant</span>
                    </button>
                    {/* Feeding Tab */}
                    <button onClick={Feeding} className="w-full flex flex-col items-center px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GiEating size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Feeding</span>
                    </button>
                    {/* Attack Tab */}
                    <button onClick={Attack} className="w-full flex flex-col items-center px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <LuSwords size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack</span>
                    </button>
                    {/* Transport Tab */}
                    <button onClick={Transport} className="w-full flex flex-col items-center px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <MdLocalShipping size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Transport</span>
                    </button>
                    {/* View Scores Tab */}
                    <button className="w-full flex flex-col items-center px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
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

                <div className={`transform transition-all duration-1000 ease-out w-full max-w-7xl ${
                    isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'
                }`}>
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-white/30 relative">
                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl sm:rounded-3xl pointer-events-none"></div>
                        
                        <div className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 lg:space-y-8 w-full">
                            {/* Title */}
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-700 mb-4 sm:mb-6">Scores Overview</h2>
                            
                            {error && (
                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4 text-sm sm:text-base">
                                    <strong>Note:</strong> {error}
                                </div>
                            )}
                            
                            {loading ? (
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500 mx-auto"></div>
                                    <p className="mt-4 text-blue-700 text-sm sm:text-base">Loading database data...</p>
                                </div>
                            ) : (
                                <>
                                    {/* Patrols Section */}
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start justify-center">
                                            {patrols.map((patrol, idx) => (
                                                <div key={patrol?._id || idx} className="bg-blue-100 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-inner w-full text-left font-mono text-gray-800" style={{background:'#c9d8e3'}}>
                                                    <div className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-center text-blue-800 border-b border-blue-300 pb-2">
                                                        {patrol?.patrolName || "No Data"}
                                                    </div>
                                                    <div className="overflow-y-auto h-32 sm:h-40 lg:h-48 pl-2 sm:pl-4 border-l-2 border-blue-300">
                                                        {patrol ? renderPatrolData(patrol) : <div className="text-gray-500 text-xs sm:text-sm">No patrol data available</div>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Lands Section */}
                                    {lands.length > 0 && (
                                        <div className="w-full mt-6 sm:mt-8">
                                            <h3 className="text-lg sm:text-xl font-bold text-blue-700 mb-4 text-center">Lands Scores</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start justify-center">
                                                {lands.map((land, idx) => (
                                                    <div key={land._id || idx} className="bg-green-100 rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 shadow-inner w-full text-left font-mono text-gray-800" style={{background:'#d4edda'}}>
                                                        <div className="overflow-y-auto h-32 sm:h-40 lg:h-48 pl-2 sm:pl-4 border-l-2 border-green-300">
                                                            {renderLandData(land, idx)}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
}

export default ViewScores;
