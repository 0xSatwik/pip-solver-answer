'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PuzzleBoard from '@/components/PuzzleBoard';
import { PuzzleData, fetchByDate } from '@/lib/api';

export default function SolverPage() {
    const today = new Date();
    const minDate = new Date('2025-08-18');

    const [selectedDate, setSelectedDate] = useState<string>(() => {
        return new Date().toISOString().split('T')[0];
    });
    const [maxDate, setMaxDate] = useState<string>(() => {
        return new Date().toISOString().split('T')[0];
    });
    const [puzzleData, setPuzzleData] = useState<PuzzleData | null>(null);
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch the latest available date from static JSON (UTC+14)
    useEffect(() => {
        fetch('/today.json')
            .then(res => {
                if (!res.ok) throw new Error('No static file');
                return res.json();
            })
            .then((data: PuzzleData) => {
                if (data && data.printDate) {
                    setMaxDate(data.printDate);
                    // Optionally update selected date if it was just "today" local time and server is ahead
                    // But usually safer to let user choose or stick to local "today".
                    // However, if local today < server today, user might want to see the latest.
                    // For now, just setting the max allowed date.
                }
            })
            .catch(() => {
                // Ignore, stick to local date as max
            });
    }, []);

    useEffect(() => {
        async function loadPuzzle() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchByDate(selectedDate);
                setPuzzleData(data);
            } catch (e) {
                setError('Puzzle not available for this date');
                setPuzzleData(null);
            }
            setLoading(false);
        }
        loadPuzzle();
    }, [selectedDate]);

    const formatDisplayDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 text-white py-10 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-400/20 rounded-full blur-3xl" />

                <div className="max-w-6xl mx-auto px-4 relative">
                    <div className="flex items-center gap-2 text-purple-200 text-sm mb-3">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>Solver</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
                        Pips Puzzle Solver
                    </h1>
                    <p className="text-lg sm:text-xl text-purple-100 mb-8">
                        Select any date and solve the puzzle interactively
                    </p>

                    {/* Date Picker */}
                    <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl">📅</span>
                            <span className="font-medium">Choose Date:</span>
                        </div>
                        <input
                            type="date"
                            value={selectedDate}
                            min={minDate.toISOString().split('T')[0]}
                            max={maxDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="px-4 py-2 rounded-xl bg-white text-gray-900 font-medium cursor-pointer focus:ring-2 focus:ring-purple-400 outline-none"
                        />
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-6xl mx-auto px-2 sm:px-4 py-8 sm:py-12">
                {/* Selected Date Display */}
                <div className="text-center mb-8">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {formatDisplayDate(selectedDate)}
                    </p>
                </div>

                {/* Difficulty Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white border-2 border-gray-200 rounded-full p-1 shadow-lg">
                        {(['easy', 'medium', 'hard'] as const).map((diff) => (
                            <button
                                key={diff}
                                onClick={() => setDifficulty(diff)}
                                className={`px-6 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-lg rounded-full transition-all duration-300 ${difficulty === diff
                                    ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                {diff.charAt(0).toUpperCase() + diff.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Puzzle Board */}
                {loading ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 text-center">
                        <div className="inline-block w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500 text-lg">Loading puzzle...</p>
                    </div>
                ) : error ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-8 sm:p-12 border border-gray-100 text-center">
                        <div className="text-6xl mb-4">😔</div>
                        <p className="text-xl text-gray-600">{error}</p>
                        <p className="mt-2 text-gray-400">Try selecting a different date</p>
                    </div>
                ) : puzzleData ? (
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-gray-100">
                        <PuzzleBoard key={`${selectedDate}-${difficulty}`} puzzle={puzzleData[difficulty]} />
                    </div>
                ) : null}

                {/* Quick Links */}
                <div className="mt-12 grid sm:grid-cols-3 gap-4">
                    <Link href="/today" className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition group">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🎯</span>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition">Today's Puzzle</h3>
                        </div>
                        <p className="text-gray-500 text-sm">View today's answer with expert analysis</p>
                    </Link>
                    <Link href="/archive" className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition group">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">📚</span>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-purple-600 transition">Full Archive</h3>
                        </div>
                        <p className="text-gray-500 text-sm">Browse all past puzzles with solutions</p>
                    </Link>
                    <Link href="/about" className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition group">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">ℹ️</span>
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-teal-600 transition">About Pips</h3>
                        </div>
                        <p className="text-gray-500 text-sm">Learn how to play the puzzle</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
