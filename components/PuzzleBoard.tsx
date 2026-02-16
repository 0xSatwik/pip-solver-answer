'use client';

import { useState, useMemo } from 'react';
import { DifficultyPuzzle, Region } from '@/lib/api';

interface PuzzleBoardProps {
    puzzle: DifficultyPuzzle;
    initialSolved?: boolean;
    readOnly?: boolean;
}

// Colorful badges matching Pips reference style (pink, purple, teal, orange, green)
const REGION_COLORS: Record<string, { bg: string; border: string; badge: string }> = {
    empty: { bg: 'bg-gray-50', border: 'border-gray-400', badge: '' },
    equals: { bg: 'bg-purple-50', border: 'border-purple-400', badge: 'bg-purple-600' },
    unequal: { bg: 'bg-pink-50', border: 'border-pink-400', badge: 'bg-pink-600' },
    less: { bg: 'bg-green-50', border: 'border-green-400', badge: 'bg-green-700' },
    greater: { bg: 'bg-orange-50', border: 'border-orange-400', badge: 'bg-orange-600' },
    sum: { bg: 'bg-teal-50', border: 'border-teal-400', badge: 'bg-teal-600' },
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

// Sizing tiers based on grid size
type SizeTier = 'normal' | 'compact' | 'tiny';

function getSizeTier(maxRow: number, maxCol: number): SizeTier {
    const maxDim = Math.max(maxRow, maxCol);
    if (maxDim >= 9) return 'tiny';
    if (maxDim >= 6) return 'compact';
    return 'normal';
}

// Cell size classes per tier
const CELL_CLASSES: Record<SizeTier, string> = {
    normal: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
    compact: 'w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14',
    tiny: 'w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12',
};

// Dot pattern size classes per tier
const DOT_GRID_CLASSES: Record<SizeTier, string> = {
    normal: 'w-8 h-8 sm:w-10 sm:h-10',
    compact: 'w-6 h-6 sm:w-8 sm:h-8',
    tiny: 'w-5 h-5 sm:w-7 sm:h-7',
};

const DOT_CLASSES: Record<SizeTier, string> = {
    normal: 'w-2 h-2 sm:w-2.5 sm:h-2.5',
    compact: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
    tiny: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
};

// Badge size classes per tier
const BADGE_CLASSES: Record<SizeTier, string> = {
    normal: 'w-6 h-6 sm:w-7 sm:h-7 text-[10px] sm:text-xs',
    compact: 'w-5 h-5 sm:w-6 sm:h-6 text-[8px] sm:text-[10px]',
    tiny: 'w-4 h-4 sm:w-5 sm:h-5 text-[7px] sm:text-[9px]',
};

// Question mark size classes per tier
const QUESTION_CLASSES: Record<SizeTier, string> = {
    normal: 'text-xl sm:text-2xl',
    compact: 'text-base sm:text-xl',
    tiny: 'text-sm sm:text-lg',
};

// Domino tile size classes per tier
const DOMINO_TILE_CLASSES: Record<SizeTier, string> = {
    normal: 'w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 p-1 sm:p-1.5',
    compact: 'w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 p-0.5 sm:p-1',
    tiny: 'w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 p-0.5 sm:p-1',
};

const DOMINO_DOT_CLASSES: Record<SizeTier, string> = {
    normal: 'w-1.5 h-1.5 sm:w-2 sm:h-2',
    compact: 'w-1 h-1 sm:w-1.5 sm:h-1.5',
    tiny: 'w-1 h-1 sm:w-1 sm:h-1',
};

export default function PuzzleBoard({ puzzle, initialSolved = false, readOnly = false }: PuzzleBoardProps) {
    const [usedDominoes, setUsedDominoes] = useState<Set<number>>(() => {
        if (!initialSolved) return new Set();
        return new Set(puzzle.dominoes.map((_, i) => i));
    });

    const [revealedCells, setRevealedCells] = useState<Map<string, { value: number; dominoIdx: number }>>(() => {
        if (!initialSolved) return new Map();
        const allRevealed = new Map<string, { value: number; dominoIdx: number }>();
        puzzle.dominoes.forEach((domino, idx) => {
            const positions = puzzle.solution[idx];
            positions.forEach(([r, c], j) => {
                allRevealed.set(`${r}-${c}`, { value: domino[j], dominoIdx: idx });
            });
        });
        return allRevealed;
    });

    const totalDominoes = puzzle.dominoes.length;
    const allIndices = puzzle.regions.flatMap(r => r.indices);
    const maxRow = Math.max(...allIndices.map(([r]) => r));
    const maxCol = Math.max(...allIndices.map(([, c]) => c));

    const sizeTier = useMemo(() => getSizeTier(maxRow, maxCol), [maxRow, maxCol]);

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
        if (readOnly || usedDominoes.has(index)) return;
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
        if (readOnly) return;
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
        if (region.type === 'empty') return null;
        if ((region.type === 'sum' || region.type === 'greater' || region.type === 'less') && region.target === undefined) return null;
        const lastIdx = region.indices[region.indices.length - 1];
        return { row: lastIdx[0], col: lastIdx[1] };
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Puzzle Grid */}
            <div className="flex justify-center overflow-x-auto py-4">
                <div className="relative inline-block">
                    <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `repeat(${maxCol + 1}, 1fr)` }}>
                        {Array.from({ length: maxRow + 1 }).map((_, rowIdx) =>
                            Array.from({ length: maxCol + 1 }).map((_, colIdx) => {
                                const cellKey = `${rowIdx}-${colIdx}`;
                                const region = cellToRegion.get(cellKey);
                                if (!region) return <div key={cellKey} className={CELL_CLASSES[sizeTier]} />;
                                const colors = REGION_COLORS[region.type] || REGION_COLORS.empty;
                                const revealed = revealedCells.get(cellKey);
                                const badgeInfo = getRegionBadgeInfo(region);
                                const showBadge = badgeInfo && badgeInfo.row === rowIdx && badgeInfo.col === colIdx;

                                const cellBgStyle = revealed
                                    ? { backgroundColor: getDominoColorRevealed(revealed.dominoIdx, totalDominoes) }
                                    : {};

                                return (
                                    <div key={cellKey} className="relative">
                                        <button
                                            onClick={() => handleCellClick(rowIdx, colIdx)}
                                            style={cellBgStyle}
                                            disabled={readOnly}
                                            className={`${CELL_CLASSES[sizeTier]} border-2 rounded-lg flex items-center justify-center transition-all ${readOnly ? '' : 'hover:scale-105'} shadow-sm ${revealed ? 'border-gray-700' : `border-dashed ${colors.bg} ${colors.border}`
                                                }`}
                                        >
                                            {revealed !== undefined ? <DotPattern dots={revealed.value} sizeTier={sizeTier} /> : <span className={`font-bold text-gray-400 ${QUESTION_CLASSES[sizeTier]}`}>?</span>}
                                        </button>
                                        {showBadge && (
                                            <div className={`absolute -bottom-1.5 -right-1.5 ${BADGE_CLASSES[sizeTier]} ${colors.badge} text-white font-bold rounded-full flex items-center justify-center shadow-lg transform rotate-45`}>
                                                <span className="-rotate-45">{region.type === 'equals' ? '=' : region.type === 'unequal' ? '≠' : region.type === 'greater' ? `>${region.target}` : region.type === 'less' ? `<${region.target}` : region.target}</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {!readOnly && (
                <>
                    {/* Instructions */}
                    <div className="text-center">
                        <p className="text-base sm:text-lg text-gray-600 font-medium">Reveal by clicking a domino below OR a cell on the board</p>
                    </div>

                    {/* Dominoes */}
                    <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-3 sm:gap-x-2 sm:gap-y-4 px-2 max-w-4xl mx-auto">
                        {puzzle.dominoes.map((domino, idx) => {
                            const isUsed = usedDominoes.has(idx);
                            const dominoColor = getDominoColor(idx, totalDominoes);
                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleDominoClick(idx)}
                                    disabled={isUsed}
                                    className={`flex rounded-lg overflow-hidden transition-all shadow-md ${isUsed ? 'opacity-40 cursor-not-allowed ring-1 ring-gray-300' : 'hover:shadow-xl hover:scale-105 cursor-pointer ring-2 ring-gray-800'}`}
                                >
                                    <DominoTile dots={domino[0]} color={dominoColor} grayed={isUsed} sizeTier={sizeTier} />
                                    <div className="w-0.5 bg-gray-600" />
                                    <DominoTile dots={domino[1]} color={dominoColor} grayed={isUsed} sizeTier={sizeTier} />
                                </button>
                            );
                        })}
                    </div>

                    {/* Clear and Solve Buttons */}
                    <div className="flex justify-center gap-4">
                        <button onClick={handleClear} className="px-5 py-2 sm:px-6 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition">
                            Clear
                        </button>
                        <button onClick={handleSolveAll} className="px-5 py-2 sm:px-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition shadow-md">
                            Solve All
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

function DotPattern({ dots, sizeTier }: { dots: number; sizeTier: SizeTier }) {
    const positions = DOT_POSITIONS[dots] || [];
    return (
        <div className={`grid grid-cols-3 grid-rows-3 ${DOT_GRID_CLASSES[sizeTier]} gap-0.5`}>
            {Array.from({ length: 9 }).map((_, i) => {
                const row = Math.floor(i / 3);
                const col = i % 3;
                const hasDot = positions.some(([r, c]) => r === row && c === col);
                return <div key={i} className="flex items-center justify-center">{hasDot && <div className={`${DOT_CLASSES[sizeTier]} bg-gray-900 rounded-full shadow-sm`} />}</div>;
            })}
        </div>
    );
}

function DominoTile({ dots, color, grayed, sizeTier }: { dots: number; color: string; grayed: boolean; sizeTier: SizeTier }) {
    const positions = DOT_POSITIONS[dots] || [];
    return (
        <div
            className={DOMINO_TILE_CLASSES[sizeTier]}
            style={{ backgroundColor: grayed ? '#e5e7eb' : color }}
        >
            <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
                {Array.from({ length: 9 }).map((_, i) => {
                    const row = Math.floor(i / 3);
                    const col = i % 3;
                    const hasDot = positions.some(([r, c]) => r === row && c === col);
                    return <div key={i} className="flex items-center justify-center">{hasDot && <div className={`${DOMINO_DOT_CLASSES[sizeTier]} rounded-full shadow-sm ${grayed ? 'bg-gray-400' : 'bg-gray-900'}`} />}</div>;
                })}
            </div>
        </div>
    );
}
