'use client';

import { useState } from 'react';
import { PuzzleData, Explanation } from '@/lib/api';
import PuzzleBoard from './PuzzleBoard';

interface PuzzleViewProps {
    data: PuzzleData;
    titleContext?: 'today' | 'yesterday' | 'date';
}

// Legacy fallback: extract sections for Easy, Medium, Hard from old single-blob how_solved
function getLegacySections(text: string): { easy: string; medium: string; hard: string } {
    const result = { easy: '', medium: '', hard: '' };
    if (!text) return result;

    const mediumMatch = text.match(/(?:For the |In the )?Medium puzzle/i);
    const hardMatch = text.match(/(?:Finally, the |For the |In the )?Hard puzzle/i);

    const mediumIdx = mediumMatch?.index ?? -1;
    const hardIdx = hardMatch?.index ?? -1;

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

// Split text into paragraphs (by double newline or by sentence midpoint)
function splitIntoParagraphs(text: string): string[] {
    if (!text) return [];
    // Try splitting by double newline first
    const byNewline = text.split(/\n\n+/).map(p => p.trim()).filter(p => p.length > 0);
    if (byNewline.length > 1) return byNewline;

    // Try splitting by single newline
    const bySingleNewline = text.split(/\n/).map(p => p.trim()).filter(p => p.length > 0);
    if (bySingleNewline.length > 1) return bySingleNewline;

    // Fallback: split at sentence boundary near middle
    const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z])/);
    if (sentences.length <= 1) return [text];
    const midpoint = Math.floor(sentences.length / 2);
    return [
        sentences.slice(0, midpoint).join(' '),
        sentences.slice(midpoint).join(' ')
    ].filter(p => p.trim());
}

// Check if explanation uses new per-difficulty format
function isNewFormat(explanation: Explanation): boolean {
    return !!(explanation.easy?.heading || explanation.medium?.heading || explanation.hard?.heading);
}

export default function PuzzleView({ data, titleContext = 'date' }: PuzzleViewProps) {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

    const explanation = data.explanation;
    const useNewFormat = explanation && isNewFormat(explanation);

    // Legacy: get sections from old how_solved blob
    const legacySections = explanation && !useNewFormat
        ? getLegacySections(explanation.how_solved || '')
        : null;

    const learnedParagraphs = explanation?.learned ? splitIntoParagraphs(explanation.learned) : [];

    const difficultyConfig = {
        easy: { emoji: '🟢', gradient: 'from-emerald-500 to-green-500', label: 'Easy', sectionGradient: 'from-emerald-50 to-green-50', sectionBorder: 'border-emerald-100', blurColor: 'bg-emerald-200' },
        medium: { emoji: '🟡', gradient: 'from-amber-500 to-orange-500', label: 'Medium', sectionGradient: 'from-amber-50 to-orange-50', sectionBorder: 'border-amber-100', blurColor: 'bg-amber-200' },
        hard: { emoji: '🔴', gradient: 'from-red-500 to-rose-500', label: 'Hard', sectionGradient: 'from-rose-50 to-red-50', sectionBorder: 'border-rose-100', blurColor: 'bg-rose-200' },
    };

    const getDateLabel = (diff: string) => {
        if (titleContext === 'today') return `Nyt Pips ${diff} answer for today`;
        if (titleContext === 'yesterday') return `Nyt Pips ${diff} answer for yesterday`;
        return `Nyt Pips ${diff} answer for ${data.printDate}`;
    };

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
                                ? `bg-gradient-to-r ${difficultyConfig[diff].gradient} text-white shadow-md`
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`}
                        >
                            <span className="mr-1 sm:mr-2">{difficultyConfig[diff].emoji}</span>
                            {difficultyConfig[diff].label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Puzzle Board Container (Interactive) */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-6 md:p-10 border border-gray-100 mb-16">
                <PuzzleBoard key={difficulty} puzzle={data[difficulty]} />
            </div>

            {/* Explanation Section */}
            {explanation && (
                <div className="mt-10 sm:mt-16 space-y-8 sm:space-y-12">
                    <div className="text-center">
                        <h2 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Expert Puzzle Analysis
                        </h2>
                        <p className="mt-2 text-gray-500 text-sm sm:text-base font-normal">Deep insights from puzzle experts</p>
                    </div>

                    {/* Per-Difficulty Analysis Sections */}
                    {(['easy', 'medium', 'hard'] as const).map((diff) => {
                        const config = difficultyConfig[diff];

                        // Get heading and body
                        let sectionHeading: string;
                        let sectionParagraphs: string[];

                        if (useNewFormat && explanation[diff]) {
                            sectionHeading = explanation[diff]!.heading;
                            sectionParagraphs = splitIntoParagraphs(explanation[diff]!.body);
                        } else if (legacySections && legacySections[diff]) {
                            sectionHeading = getDateLabel(diff);
                            sectionParagraphs = splitIntoParagraphs(legacySections[diff]);
                        } else {
                            return null; // No content for this difficulty
                        }

                        if (sectionParagraphs.length === 0) return null;

                        return (
                            <div key={diff} className={`bg-gradient-to-br ${config.sectionGradient} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg ${config.sectionBorder} border relative overflow-hidden`}>
                                <div className={`absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 ${config.blurColor} rounded-full blur-3xl opacity-30`} />
                                <div className="relative">
                                    <div className="flex items-center gap-2 sm:gap-3 mb-6">
                                        <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                                            <span className="text-xl sm:text-2xl">{config.emoji}</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg sm:text-2xl font-extrabold text-gray-900">
                                                {sectionHeading}
                                            </h3>
                                            {useNewFormat && (
                                                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                                                    {getDateLabel(diff)}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Solved Board Preview */}
                                    <div className="mb-6 flex justify-center bg-white/50 rounded-xl p-2 sm:p-4 shadow-sm border border-gray-100/50 overflow-hidden">
                                        <div className={`pointer-events-none origin-center ${diff === 'hard' ? 'scale-[0.65] sm:scale-90 md:scale-100 -my-6 sm:-my-2 md:my-0' : 'scale-90 sm:scale-100'}`}>
                                            <PuzzleBoard puzzle={data[diff]} initialSolved readOnly />
                                            <p className="text-center text-xs sm:text-sm text-gray-500 font-medium mt-2">Answer for {data.printDate}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 sm:space-y-4">
                                        {sectionParagraphs.map((para, idx) => (
                                            <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-lg font-normal">{para}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Pro Tips Section (new format only) */}
                    {useNewFormat && explanation.tips && (
                        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg border border-indigo-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-indigo-200 rounded-full blur-3xl opacity-30" />
                            <div className="relative">
                                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <span className="text-xl sm:text-2xl">🎯</span>
                                    </div>
                                    <h3 className="text-lg sm:text-2xl font-extrabold text-indigo-900">Pro Tips for Today&apos;s Puzzle</h3>
                                </div>
                                <div className="space-y-3 sm:space-y-4">
                                    {splitIntoParagraphs(explanation.tips).map((para, idx) => (
                                        <p key={idx} className="text-gray-700 leading-relaxed text-sm sm:text-lg font-normal">{para}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* What I Learned */}
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
                                {explanation.faqs.map((faq, idx) => (
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
