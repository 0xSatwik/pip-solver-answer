const API_BASE = 'https://pips-worker.pipssolver.workers.dev';

export interface PuzzleData {
    printDate: string;
    editor: string;
    easy: DifficultyPuzzle;
    medium: DifficultyPuzzle;
    hard: DifficultyPuzzle;
    explanation?: Explanation;
}

export interface DifficultyPuzzle {
    id: number;
    backendId: string;
    constructors: string;
    dominoes: number[][];
    regions: Region[];
    solution: number[][][];
}

export interface Region {
    indices: number[][];
    type: 'sum' | 'equals' | 'empty' | 'greater' | 'less' | 'unequal';
    target?: number;
}

export interface Explanation {
    how_solved: string;
    learned: string;
    faqs: FAQ[];
}

export interface FAQ {
    question: string;
    answer: string;
}

export async function fetchToday(): Promise<PuzzleData> {
    const res = await fetch(`${API_BASE}/today`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error('Failed to fetch today');
    return res.json();
}

export async function fetchYesterday(): Promise<PuzzleData> {
    const res = await fetch(`${API_BASE}/yesterday`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Failed to fetch yesterday');
    return res.json();
}

export async function fetchByDate(date: string): Promise<PuzzleData> {
    const res = await fetch(`${API_BASE}/date/${date}`, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`Failed to fetch ${date}`);
    return res.json();
}

export async function fetchArchive(page: number = 1, limit: number = 20) {
    const res = await fetch(`${API_BASE}/list?page=${page}&limit=${limit}`, { next: { revalidate: 600 } });
    if (!res.ok) throw new Error('Failed to fetch archive');
    return res.json();
}
