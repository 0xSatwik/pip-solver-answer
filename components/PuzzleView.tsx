'use client';

import { useState } from 'react';
import { PuzzleData } from '@/lib/api';
import PuzzleBoard from './PuzzleBoard';

interface PuzzleViewProps {
    data: PuzzleData;
}

// Split into more paragraphs (every 2 sentences)
function splitHowSolved(text: string): string[] {
    const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
    const paragraphs: string[] = [];
    let current = '';
    sentences.forEach((sentence, idx) => {
        current += (current ? ' ' : '') + sentence;
        if ((idx + 1) % 2 === 0 || idx === sentences.length - 1) {
            paragraphs.push(current);
            current = '';
        }
    });
    if (current) paragraphs.push(current);
    return paragraphs.filter(p => p.trim());
}

// Split into exactly 3 equal paragraphs
function splitLearned(text: string): string[] {
    const words = text.split(' ');
    const chunkSize = Math.ceil(words.length / 3);
    const paragraphs: string[] = [];
    for (let i = 0; i < 3; i++) {
        const chunk = words.slice(i * chunkSize, (i + 1) * chunkSize).join(' ');
        if (chunk) paragraphs.push(chunk);
    }
    return paragraphs;
}

export default function PuzzleView({ data }: PuzzleViewProps) {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

    const howSolvedParagraphs = data.explanation?.how_solved ? splitHowSolved(data.explanation.how_solved) : [];
    const learnedParagraphs = data.explanation?.learned ? splitLearned(data.explanation.learned) : [];

    return (
        <div className="max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-10">
            {/* Difficulty Tabs */}
            <div className="flex justify-center mb-6 sm:mb-10">
                <div className="inline-flex bg-white border-2 border-gray-200 rounded-full p-1 shadow-lg">
                    {(['easy', 'medium', 'hard'] as const).map((diff) => (
                        <button
                            key={diff}
                            onClick={() => setDifficulty(diff)}
                            className={`px-4 sm:px-8 py-2 sm:py-3 font-semibold text-sm sm:text-lg rounded-full transition-all duration-300 ${difficulty === diff
                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            {diff.charAt(0).toUpperCase() + diff.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Puzzle Board Container */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-gray-100">
                <PuzzleBoard key={difficulty} puzzle={data[difficulty]} />
            </div>

            {/* Explanation Section */}
            {data.explanation && (
                <div className="mt-10 sm:mt-16 space-y-6 sm:space-y-10">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Expert Puzzle Analysis
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm sm:text-base">Deep insights from puzzle experts</p>
                    </div>

                    {/* How Solved */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-blue-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-full blur-3xl opacity-30" />
                        <div className="relative">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl sm:text-2xl">🧠</span>
                                </div>
                                <h3 className="text-lg sm:text-2xl font-bold text-blue-900">How I Solved It</h3>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {howSolvedParagraphs.map((para, idx) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-lg">{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* What Learned */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-200 rounded-full blur-3xl opacity-30" />
                        <div className="relative">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl sm:text-2xl">💡</span>
                                </div>
                                <h3 className="text-lg sm:text-2xl font-bold text-purple-900">What I Learned</h3>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {learnedParagraphs.map((para, idx) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-lg">{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-emerald-100 relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-emerald-200 rounded-full blur-3xl opacity-30" />
                        <div className="relative">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl sm:text-2xl">❓</span>
                                </div>
                                <h3 className="text-lg sm:text-2xl font-bold text-emerald-900">Frequently Asked Questions</h3>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                {data.explanation.faqs.map((faq, idx) => (
                                    <details key={idx} className="group bg-white/80 backdrop-blur rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                                        <summary className="p-3 sm:p-5 font-medium text-emerald-800 cursor-pointer hover:bg-emerald-50 transition list-none flex items-center justify-between gap-2 sm:gap-4">
                                            <span className="text-sm sm:text-lg">{faq.question}</span>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-3 sm:px-5 pb-3 sm:pb-5 text-gray-700 leading-relaxed text-sm sm:text-base">{faq.answer}</div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
