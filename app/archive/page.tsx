'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { formatDateToSlug } from '@/lib/utils';

interface ArchiveItem {
    date: string;
    data: any;
}

export default function ArchivePage() {
    const [items, setItems] = useState<ArchiveItem[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadArchive() {
            setLoading(true);
            try {
                const res = await fetch(`https://pips-worker.pipssolver.workers.dev/list?page=${page}&limit=20`);
                const data = await res.json();
                setItems(data);
            } catch (e) {
                console.error('Failed to load archive:', e);
            }
            setLoading(false);
        }
        loadArchive();
    }, [page]);

    return (
        <div>
            <div className="bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 text-white py-10 sm:py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
                <div className="max-w-6xl mx-auto px-4 relative">
                    <div className="flex items-center gap-2 text-green-200 text-sm mb-3">
                        <Link href="/" className="hover:text-white transition">Home</Link>
                        <span>›</span>
                        <span>Archive</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3">Pips Puzzle Archive</h1>
                    <p className="text-lg sm:text-xl text-green-100">Browse all past puzzles and solutions</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link href="/today" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                            Today's Answer
                        </Link>
                        <Link href="/yesterday" className="px-4 py-2 bg-white/10 backdrop-blur rounded-lg text-sm hover:bg-white/20 transition">
                            Yesterday's Answer
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-12">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-500">Loading puzzles...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item) => (
                                <Link
                                    key={item.date}
                                    href={`/nyt-pips-answer-for-${formatDateToSlug(item.date)}`}
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group border border-gray-100"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-xl sm:text-2xl font-bold text-gray-900">{item.date}</span>
                                        <span className="text-indigo-600 group-hover:translate-x-1 transition text-lg">→</span>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">Easy</span>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">Medium</span>
                                        <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium">Hard</span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-4 mt-12">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition font-medium shadow-md"
                            >
                                ← Previous
                            </button>
                            <span className="px-6 py-3 bg-gray-100 rounded-xl font-semibold text-gray-700">
                                Page {page}
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={items.length < 20}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition font-medium shadow-md"
                            >
                                Next →
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Related Links */}
            <div className="max-w-6xl mx-auto px-4 pb-12">
                <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href="/today" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-green-600">Today's Puzzle</h3>
                            <p className="text-sm text-gray-500">Solve today's challenge</p>
                        </Link>
                        <Link href="/yesterday" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-green-600">Yesterday's Puzzle</h3>
                            <p className="text-sm text-gray-500">Previous day's solution</p>
                        </Link>
                        <Link href="/about" className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                            <h3 className="font-semibold text-green-600">About Pips</h3>
                            <p className="text-sm text-gray-500">Learn how to play</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
