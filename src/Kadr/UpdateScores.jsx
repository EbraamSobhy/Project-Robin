import React, { useEffect, useState, } from 'react';
import '../Scout/tailwind.css';
import { GrScorecard } from "react-icons/gr";
import { PiSword } from "react-icons/pi";
import { GiTrade, GiHand, GiCorn } from "react-icons/gi";
import { FaHandHoldingHeart, FaChartLine } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateScores() {
const [isVisible, setIsVisible] = useState(false);
    const [username, setUsername] = useState(" ");
    const [patrols, setPatrols] = useState([]);
    const [lands, setLands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Patrol names based on the dropdown options found in other components
    const patrolNames = ['Panther', 'Lion', 'Cobra', 'Tiger', 'Fox', 'Wolf'];

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

    // Function to render patrol data
    const renderPatrolData = (patrol) => {
        if (!patrol) return null;
        
        const patrolInfo = [
            { label: "💂 Total Soldiers", value: patrol.totalSoldiers || 0 },
            { label: "🏘️ Total Houses", value: patrol.totalHouses || 0 },
            { label: "🏇 Total Carts", value: patrol.totalCarts || 0 },
            { label: "🛠️ Total Workshops", value: patrol.totalWorkshops || 0 },
            { label: "🏞️ Total Lands", value: patrol.totalLands || 0 },
            { label: "🐎 Total Horses", value: patrol.totalHorses || 0 },
            { label: "💰 Total Coins", value: patrol.totalCoins || 0 },
            { label: "🐎 Rent Horses", value: patrol.rentHorses || 0 },
            { label: "🏇 Rent Carts", value: patrol.rentCarts || 0 },
            { label: "🌾 Wheat Seeds", value: patrol.wheatSeeds || 0 },
            { label: "🍎 Apple Seeds", value: patrol.appleSeeds || 0 },
            { label: "🍉 Watermelon Seeds", value: patrol.watermelonSeeds || 0 },
            { label: "🍉 Watermelon", value: patrol.watermelon || 0 },
            { label: "🍎 Apple", value: patrol.apple || 0 },
            { label: "🌾 Wheat", value: patrol.wheat || 0 },
            { label: "🌱 Total Soil", value: patrol.totalSoil || 0 },
            { label: "🍎 Apple Soil", value: patrol.appleSoil || 0 },
            { label: "🍉 Watermelon Soil", value: patrol.watermelonSoil || 0 },
            { label: "🌾 Wheat Soil", value: patrol.wheatSoil || 0 },
            { label: "⬜ Empty Soil", value: patrol.emptySoil || 0 },
        ];

        return patrolInfo.map((item, i) => (
            <div key={i} className="py-0.5">
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
            <div key={i} className="py-0.5">
                {item.label}: {item.value}
            </div>
        ));
    };

    // Navigate
    const Home = () => {
        navigate('/kadr');
    };

    const AttackConditions = () => {
        navigate('/kadr/AttackConditions');
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
                    <button className="w-full flex flex-col items-center py-2 px-2 group bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <GrScorecard size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Update Scores</span>
                    </button>
                     {/* Attack Tab */}
                    <button onClick={AttackConditions} className="w-full flex flex-col items-center py-2 px-2 group hover:bg-blue-50 transition relative">
                        <span className="absolute left-0 top-0 h-full w-1 bg-transparent group-hover:bg-blue-500 rounded-r transition"></span>
                        <div className="w-12 h-12 flex items-center justify-center text-blue-500 mb-1">
                            <PiSword size={25} />
                        </div>
                        <span className="text-xs text-blue-700 font-semibold">Attack Conditions</span>
                    </button>
                    {/* Trade Tab */}
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
                                    <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/30 relative min-w-[700px] min-h-[500px] flex flex-col items-center mr-20">
                                        {/* Subtle inner glow */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-3xl pointer-events-none"></div>
                                        <div className="relative z-10 flex flex-col items-center space-y-8 w-full">
                                            {/* Title */}
                                            <h2 className="text-3xl font-bold text-blue-700 mb-6">Scores Overview</h2>
                                            
                                            {error && (
                                                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                                                    <strong>Note:</strong> {error}
                                                </div>
                                            )}
                                            
                                            {loading ? (
                                                <div className="text-center">
                                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                                                    <p className="mt-4 text-blue-700">Loading database data...</p>
                                                </div>
                                            ) : (
                                                <>
                                                    {/* Patrols Section */}
                                                    <div className="w-full">
                                                        <div className="grid grid-cols-3 gap-8 items-center justify-center">
                                                            {patrols.map((patrol, idx) => (
                                                                <div key={patrol?._id || idx} className="bg-blue-100 rounded-xl p-8 shadow-inner w-96 h-72 text-left font-mono text-gray-800" style={{background:'#c9d8e3'}}>
                                                                    <div className="text-lg font-semibold mb-4 text-center text-blue-800 border-b border-blue-300 pb-2">
                                                                        {patrol?.patrolName || "No Data"}
                                                                    </div>
                                                                    <div className="overflow-y-auto h-48 pl-4 border-l-2 border-blue-300">
                                                                        {patrol ? renderPatrolData(patrol) : <div className="text-gray-500">No patrol data available</div>}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                
                                                    {/* Lands Section */}
                                                    {lands.length > 0 && (
                                                        <div className="w-full mt-8">
                                                            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Lands Scores</h3>
                                                            <div className="grid grid-cols-3 gap-8 items-center justify-center">
                                                                {lands.map((land, idx) => (
                                                                    <div key={land._id || idx} className="bg-green-100 rounded-xl p-8 shadow-inner w-96 h-72 text-left font-mono text-gray-800" style={{background:'#d4edda'}}>
                                                                        <div className="overflow-y-auto h-64 pl-4 border-l-2 border-green-300">
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

export default UpdateScores;
