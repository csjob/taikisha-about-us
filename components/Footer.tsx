'use client';

import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#001F4D] text-white w-full py-3 px-6 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">

                {/* Logo */}
                <div className="flex-shrink-0 h-6 w-28 relative">
                    <Image
                        src="/images/logo.png"
                        alt="TAIKISHA"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Address */}
                <p className="flex-1 text-white/80 text-[9px] md:text-xs leading-snug text-center md:text-left">
                    Plot No.26, Udyog Vihar, Phase IV, Gurugram, Haryana 122015 | Phone: (+91) 124-2454211/14/16/302000
                </p>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-end gap-3 text-white/80 text-[9px] md:text-xs font-medium">
                    <a href="#" className="hover:text-white transition">CAREERS</a>
                    <a href="#" className="hover:text-white transition">PRIVACY POLICY</a>
                    <a href="#" className="hover:text-white transition">COOKIE POLICY</a>
                    <a href="#" className="hover:text-white transition">TERMS OF USE</a>
                </div>
            </div>
        </footer>
    );
}
