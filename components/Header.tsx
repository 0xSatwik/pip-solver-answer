'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-gray-100' : 'bg-white/80 backdrop-blur-lg border-b border-gray-100/50'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-18">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
                            <span className="text-white text-xl sm:text-2xl font-black">P</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                                Pips Answer
                            </span>
                            <span className="text-[10px] sm:text-xs text-gray-400 font-medium -mt-0.5 hidden sm:block">NYT Puzzle Solutions</span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/today" className="px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium">
                            Today
                        </Link>
                        <Link href="/yesterday" className="px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium">
                            Yesterday
                        </Link>
                        <Link href="/solver" className="px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium">
                            Solver
                        </Link>
                        <Link href="/archive" className="px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium">
                            Archive
                        </Link>
                        <Link href="/about" className="px-4 py-2 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium">
                            About
                        </Link>
                        <Link href="/solver" className="ml-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md hover:shadow-lg hover:scale-105">
                            Solve Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-4 border-t border-gray-100">
                        <div className="flex flex-col gap-1">
                            <Link href="/today" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium flex items-center gap-3">
                                <span className="text-lg">🎯</span> Today&apos;s Answer
                            </Link>
                            <Link href="/yesterday" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium flex items-center gap-3">
                                <span className="text-lg">📅</span> Yesterday&apos;s Answer
                            </Link>
                            <Link href="/solver" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium flex items-center gap-3">
                                <span className="text-lg">🧩</span> Solver
                            </Link>
                            <Link href="/archive" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium flex items-center gap-3">
                                <span className="text-lg">📚</span> Archive
                            </Link>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium flex items-center gap-3">
                                <span className="text-lg">ℹ️</span> About
                            </Link>
                            <Link href="/contact" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition font-medium flex items-center gap-3">
                                <span className="text-lg">✉️</span> Contact
                            </Link>
                            <div className="mt-3 px-4">
                                <Link href="/solver" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition">
                                    Solve Puzzle →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
