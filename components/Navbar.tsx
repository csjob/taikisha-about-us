'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/10 backdrop-blur-md shadow-sm border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo Area */}
                <Link href="/" className="flex items-center gap-2 group">
                    {/* Placeholder for Logo - using text for now or verify if asset exists */}
                    {/* Logo Image */}
                    <div className="relative h-8 w-40"> {/* Fixed height, width container */}
                        {/* Make sure to place public/images/logo.png */}
                        <Image
                            src="/images/logo.png"
                            alt="TAIKISHA"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    {['ABOUT US', 'PRODUCTS AND TECHNOLOGIES', 'OUR CLIENTS', 'CONTACT US', 'CSR'].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-xs font-bold text-slate-800 hover:text-blue-600 tracking-widest uppercase transition-colors relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button (Hamburger) */}
                <button className="md:hidden p-2 text-slate-800">
                    <div className="w-6 h-0.5 bg-current mb-1.5" />
                    <div className="w-6 h-0.5 bg-current mb-1.5" />
                    <div className="w-6 h-0.5 bg-current" />
                </button>
            </div>
        </nav>
    );
}
