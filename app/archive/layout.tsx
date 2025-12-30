import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Pips Puzzle Archive | All Past NYT Pips Answers",
    description: "Browse our complete archive of NYT Pips puzzle solutions. Find answers for any date with Easy, Medium, and Hard difficulty levels. Expert analysis included.",
    keywords: ["pips archive", "pips puzzle history", "past pips answers", "nyt pips archive", "old pips puzzles"],
};

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
    return children;
}
