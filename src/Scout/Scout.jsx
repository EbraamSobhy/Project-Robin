import React, { useEffect, useState } from 'react';
import './tailwind.css'
import image from '../assets/image.PNG';

function Scout() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 to-blue-300 flex items-center justify-center p-6">
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
    );
}

export default Scout;