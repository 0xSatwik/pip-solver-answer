'use client';

import { useState } from 'react';
import { DifficultyPuzzle, Region } from '@/lib/api';

interface PuzzleBoardProps {
    puzzle: DifficultyPuzzle;
}

// Grayscale colors for regions (matching Pips reference style)
const REGION_COLORS: Record<string, { bg: string; border: string; badge: string }> = {
    empty: { bg: 'bg-gray-50', border: 'border-gray-400', badge: '' },
    equals: { bg: 'bg-gray-100', border: 'border-gray-500', badge: 'bg-gray-600' },
    unequal: { bg: 'bg-gray-150', border: 'border-gray-500', badge: 'bg-gray-600' },
    less: { bg: 'bg-gray-200', border: 'border-gray-500', badge: 'bg-gray-700' },
    greater: { bg: 'bg-gray-200', border: 'border-gray-500', badge: 'bg-gray-700' },
    sum: { bg: 'bg-gray-300', border: 'border-gray-600', badge: 'bg-gray-800' },
};

const DOT_POSITIONS: Record<number, [number, number][]> = {
    0: [],
    1: [[1, 1]],
    2: [[0, 2], [2, 0]],
    3: [[0, 2], [1, 1], [2, 0]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [0, 2], [1, 0], [1, 2], [2, 0], [2, 2]],
};

// Generate HSL color for domino based on its index (Pips reference style)
function getDominoColor(index: number, total: number): string {
    const hue = (360 * index) / total;
    return `hsl(${hue}, 100%, 80%)`;
}

// Generate darker HSL color for revealed cells
function getDominoColorRevealed(index: number, total: number): string {
    const hue = (360 * index) / total;
    return `hsl(${hue}, 85%, 75%)`;
}

export default function PuzzleBoard({ puzzle }: PuzzleBoardProps) {
    const [usedDominoes, setUsedDominoes] = useState<Set<number>>(new Set());
    const [revealedCells, setRevealedCells] = useState<Map<string, { value: number; dominoIdx: number }>>(new Map());

    const totalDominoes = puzzle.dominoes.length;
    const allIndices = puzzle.regions.flatMap(r => r.indices);
    const maxRow = Math.max(...allIndices.map(([r]) => r));
    const maxCol = Math.max(...allIndices.map(([, c]) => c));

    const cellToRegion = new Map<string, Region>();
    puzzle.regions.forEach(region => {
        region.indices.forEach(([r, c]) => {
            cellToRegion.set(`${r}-${c}`, region);
        });
    });

    const getCellValue = (row: number, col: number): { value: number; dominoIdx: number } | null => {
        for (let i = 0; i < puzzle.solution.length; i++) {
            const positions = puzzle.solution[i];
            for (let j = 0; j < positions.length; j++) {
                const [r, c] = positions[j];
                if (r === row && c === col) {
                    return { value: puzzle.dominoes[i][j], dominoIdx: i };
                }
            }
        }
        return null;
    };

    const handleDominoClick = (index: number) => {
        if (usedDominoes.has(index)) return;
        setUsedDominoes(prev => new Set([...prev, index]));
        const positions = puzzle.solution[index];
        const domino = puzzle.dominoes[index];
        const newRevealed = new Map(revealedCells);
        positions.forEach(([r, c], idx) => {
            newRevealed.set(`${r}-${c}`, { value: domino[idx], dominoIdx: index });
        });
        setRevealedCells(newRevealed);
    };

    const handleCellClick = (row: number, col: number) => {
        const result = getCellValue(row, col);
        if (!result) return;
        const newRevealed = new Map(revealedCells);
        const positions = puzzle.solution[result.dominoIdx];
        const domino = puzzle.dominoes[result.dominoIdx];
        positions.forEach(([r, c], idx) => {
            newRevealed.set(`${r}-${c}`, { value: domino[idx], dominoIdx: result.dominoIdx });
        });
        setRevealedCells(newRevealed);
        setUsedDominoes(prev => new Set([...prev, result.dominoIdx]));
    };

    const handleClear = () => {
        setUsedDominoes(new Set());
        setRevealedCells(new Map());
    };

    const handleSolveAll = () => {
        const allUsed = new Set<number>();
        const allRevealed = new Map<string, { value: number; dominoIdx: number }>();
        puzzle.dominoes.forEach((domino, idx) => {
            allUsed.add(idx);
            const positions = puzzle.solution[idx];
            positions.forEach(([r, c], j) => {
                allRevealed.set(`${r}-${c}`, { value: domino[j], dominoIdx: idx });
            });
        });
        setUsedDominoes(allUsed);
        setRevealedCells(allRevealed);
    };

    const getRegionBadgeInfo = (region: Region): { row: number; col: number } | null => {
        if (region.type === 'empty' || region.target === undefined) return null;
        const lastIdx = region.indices[region.indices.length - 1];
        return { row: lastIdx[0], col: lastIdx[1] };
    };

    return (
        <div className="space-y-8">
            {/* Puzzle Grid */}
            <div className="flex justify-center overflow-x-auto py-4">
                <div className="relative inline-block">
                    <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `repeat(${maxCol + 1}, 1fr)` }}>
                        {Array.from({ length: maxRow + 1 }).map((_, rowIdx) =>
                            Array.from({ length: maxCol + 1 }).map((_, colIdx) => {
                                const cellKey = `${rowIdx}-${colIdx}`;
                                const region = cellToRegion.get(cellKey);
                                if (!region) return <div key={cellKey} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />;
                                const colors = REGION_COLORS[region.type] || REGION_COLORS.empty;
                                const revealed = revealedCells.get(cellKey);
                                const badgeInfo = getRegionBadgeInfo(region);
                                const showBadge = badgeInfo && badgeInfo.row === rowIdx && badgeInfo.col === colIdx;

                                // Get cell background color - use domino color if revealed
                                const cellBgStyle = revealed
                                    ? { backgroundColor: getDominoColorRevealed(revealed.dominoIdx, totalDominoes) }
                                    : {};

                                return (
                                    <div key={cellKey} className="relative">
                                        <button
                                            onClick={() => handleCellClick(rowIdx, colIdx)}
                                            style={cellBgStyle}
                                            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-2 rounded-lg flex items-center justify-center transition-all hover:scale-105 shadow-sm ${revealed ? 'border-gray-700' : `border-dashed ${colors.bg} ${colors.border}`
                                                }`}
                                        >
                                            {revealed !== undefined ? <DotPattern dots={revealed.value} /> : <span className="text-xl sm:text-2xl font-bold text-gray-400">?</span>}
                                        </button>
                                        {showBadge && (
                                            <div className={`absolute -bottom-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 ${colors.badge} text-white text-[10px] sm:text-xs font-bold rounded-full flex items-center justify-center shadow-lg transform rotate-45`}>
                                                <span className="-rotate-45">{region.type === 'equals' ? '=' : region.type === 'greater' ? `>${region.target}` : region.type === 'less' ? `<${region.target}` : region.target}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* Instructions */}
            <div className="text-center">
                <p className="text-base sm:text-lg text-gray-600 font-medium">Reveal by clicking a domino below OR a cell on the board</p>
            </div>

            {/* Dominoes - With Rainbow Colors like Pips */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-2">
                {puzzle.dominoes.map((domino, idx) => {
                    const isUsed = usedDominoes.has(idx);
                    const dominoColor = getDominoColor(idx, totalDominoes);
                    return (
                        <button
                            key={idx}
                            onClick={() => handleDominoClick(idx)}
                            disabled={isUsed}
                            className={`flex rounded-xl overflow-hidden transition-all shadow-md ${isUsed ? 'opacity-40 cursor-not-allowed ring-2 ring-gray-300' : 'hover:shadow-xl hover:scale-105 cursor-pointer ring-2 ring-gray-800'}`}
                        >
                            <DominoTile dots={domino[0]} color={dominoColor} grayed={isUsed} />
                            <div className="w-0.5 bg-gray-600" />
                            <DominoTile dots={domino[1]} color={dominoColor} grayed={isUsed} />
                        </button>
                    );
                })}
            </div>

            {/* Clear and Solve Buttons */}
            <div className="flex justify-center gap-4">
                <button onClick={handleClear} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition">
                    Clear
                </button>
                <button onClick={handleSolveAll} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition shadow-md">
                    Solve All
                </button>
            </div>
        </div>
    );
}

function DotPattern({ dots }: { dots: number }) {
    const positions = DOT_POSITIONS[dots] || [];
    return (
        <div className="grid grid-cols-3 grid-rows-3 w-8 h-8 sm:w-10 sm:h-10 gap-0.5">
            {Array.from({ length: 9 }).map((_, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const hasDot = positions.some(([r, c]) => r === row && c === col);
                return <div key={i} className="flex items-center justify-center">{hasDot && <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gray-900 rounded-full shadow-sm" />}</div>;
            })}
        </div>
    );
}

function DominoTile({ dots, color, grayed }: { dots: number; color: string; grayed: boolean }) {
    const positions = DOT_POSITIONS[dots] || [];
    return (
        <div
            className="w-10 h-14 sm:w-12 sm:h-16 p-1 sm:p-1.5"
            style={{ backgroundColor: grayed ? '#e5e7eb' : color }}
        >
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                {Array.from({ length: 9 }).map((_, i) => {
                    const row = Math.floor(i / 3);
                    const col = i % 3;
                    const hasDot = positions.some(([r, c]) => r === row && c === col);
                    return <div key={i} className="flex items-center justify-center">{hasDot && <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full shadow-sm ${grayed ? 'bg-gray-400' : 'bg-gray-900'}`} />}</div>;
                })}
            </div>
        </div>
    );
}
