'use client';

import { useState } from 'react';
import { PuzzleData } from '@/lib/api';
import PuzzleBoard from './PuzzleBoard';

interface PuzzleViewProps {
    data: PuzzleData;
}

// Extract sections for Easy, Medium, Hard from the big text block
function getDifficultySections(text: string): { easy: string; medium: string; hard: string } {
    const result = { easy: '', medium: '', hard: '' };
    if (!text) return result;

    // We assume the text flows: Easy -> Medium -> Hard
    // Typical transitions: "For the Medium puzzle..." and "Finally, the Hard puzzle..."
    // We'll look for "Medium puzzle" and "Hard puzzle" as split points.

    const mediumMatch = text.match(/(?:For the |In the )?Medium puzzle/i);
    const hardMatch = text.match(/(?:Finally, the |For the |In the )?Hard puzzle/i);

    let mediumIdx = mediumMatch?.index ?? -1;
    let hardIdx = hardMatch?.index ?? -1;

    // Safety: if hard comes before medium or logic fails
    if (mediumIdx !== -1 && hardIdx !== -1 && hardIdx < mediumIdx) {
        // Fallback or swap? Let's just trust finding the first occurrence
    }

    if (mediumIdx === -1) {
        result.easy = text;
        return result;
    }

    result.easy = text.substring(0, mediumIdx).trim();

    if (hardIdx === -1) {
        result.medium = text.substring(mediumIdx).trim();
    } else {
        result.medium = text.substring(mediumIdx, hardIdx).trim();
        result.hard = text.substring(hardIdx).trim();
    }

    return result;
}

// Split into 2 equal paragraphs after complete sentences
function splitLearned(text: string): string[] {
    const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
    if (sentences.length <= 1) return [text];

    const midpoint = Math.floor(sentences.length / 2);
    const firstHalf = sentences.slice(0, midpoint).join(' ');
    const secondHalf = sentences.slice(midpoint).join(' ');

    return [firstHalf, secondHalf].filter(p => p.trim());
}

export default function PuzzleView({ data }: PuzzleViewProps) {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

    // Split explanation by difficulty
    const sections = getDifficultySections(data.explanation?.how_solved || '');
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

            {/* Puzzle Board Container (Interactive) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-10 border border-gray-100 mb-16">
                <PuzzleBoard key={difficulty} puzzle={data[difficulty]} />
            </div>

            {/* Explanation Section */}
            {data.explanation && (
                <div className="mt-10 sm:mt-16 space-y-8 sm:space-y-12">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Expert Puzzle Analysis
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm sm:text-base font-normal">Deep insights from puzzle experts</p>
                    </div>

                    {/* Difficulty Specific Analysis */}
                    {(['easy', 'medium', 'hard'] as const).map((diff) => {
                        const sectionText = sections[diff];
                        if (!sectionText) return null;

                        return (
                            <div key={diff} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-full blur-3xl opacity-30" />
                                <div className="relative">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-6">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <span className="text-xl sm:text-2xl">🧠</span>
                                        </div>
                                        <h3 className="text-lg sm:text-2xl font-extrabold text-blue-900 capitalize">{diff} Difficulty Hints</h3>
                                    </div>

                                    {/* Solved Board Preview */}
                                    <div className="mb-6 flex justify-center bg-white/50 rounded-xl p-4 shadow-sm border border-blue-100/50">
                                        <div className="pointer-events-none transform scale-90 sm:scale-100 origin-center">
                                            <PuzzleBoard puzzle={data[diff]} initialSolved readOnly />
                                            <p className="text-center text-xs sm:text-sm text-gray-500 font-medium mt-2">Answer for {data.printDate}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        {splitLearned(sectionText).map((para, idx) => (
                                            <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-lg font-normal">{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* What Learned */}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-purple-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-200 rounded-full blur-3xl opacity-30" />
                        <div className="relative">
                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl sm:text-2xl">💡</span>
                                </div>
                                <h3 className="text-lg sm:text-2xl font-extrabold text-purple-900">What I Learned</h3>
                            </div>
                            <div className="space-y-3 sm:space-y-4">
                                {learnedParagraphs.map((para, idx) => (
                                    <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-lg font-normal">{para}</p>
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
                                <h3 className="text-lg sm:text-2xl font-extrabold text-emerald-900">Frequently Asked Questions</h3>
                            </div>
                            <div className="space-y-2 sm:space-y-3">
                                {data.explanation.faqs.map((faq, idx) => (
                                    <details key={idx} className="group bg-white/80 backdrop-blur rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
                                        <summary className="p-3 sm:p-5 font-medium text-emerald-800 cursor-pointer hover:bg-emerald-50 transition list-none flex items-center justify-between gap-2 sm:gap-4">
                                            <span className="text-sm sm:text-lg font-bold">{faq.question}</span>
                                            <span className="text-emerald-500 group-open:rotate-180 transition-transform duration-300 flex-shrink-0">
                                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="px-3 sm:px-5 pb-3 sm:pb-5 text-gray-700 leading-relaxed text-sm sm:text-base font-normal">{faq.answer}</div>
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
