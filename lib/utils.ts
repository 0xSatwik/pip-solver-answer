export function formatDateToSlug(dateStr: string): string {
    // Input: YYYY-MM-DD (e.g., 2026-01-15)
    // Output: MMMM-DD-YYYY (e.g., january-15-2026)
    try {
        const date = new Date(dateStr);
        // Use UTC to avoid timezone shifts if the input assumes UTC
        // Assuming dateStr is YYYY-MM-DD, parsing it as ISO might be UTC or local depending on browser/node.
        // Better to split and construct.
        const [year, month, day] = dateStr.split('-').map(Number);

        // Month is 0-indexed in JS Date
        const d = new Date(year, month - 1, day);

        const monthName = d.toLocaleString('en-US', { month: 'long' }).toLowerCase();
        return `${monthName}-${day}-${year}`;
    } catch (e) {
        console.error('Error formatting date to slug:', e);
        return dateStr;
    }
}

export function parseSlugToDate(slug: string): string | null {
    // Input: slug (e.g., january-15-2026) or full slug (nyt-pips-answer-for-january-15-2026)
    // Output: YYYY-MM-DD (e.g., 2026-01-15)

    // First, try to remove the prefix if present
    const prefix = 'nyt-pips-answer-for-';
    let datePart = slug;

    if (slug.startsWith(prefix)) {
        datePart = slug.substring(prefix.length);
    }

    // Expected format: month-day-year (e.g. january-15-2026)
    const parts = datePart.split('-');
    if (parts.length !== 3) return null;

    const [monthName, dayStr, yearStr] = parts;
    const day = parseInt(dayStr);
    const year = parseInt(yearStr);

    if (isNaN(day) || isNaN(year)) return null;

    const months: { [key: string]: number } = {
        'january': 1, 'february': 2, 'march': 3, 'april': 4, 'may': 5, 'june': 6,
        'july': 7, 'august': 8, 'september': 9, 'october': 10, 'november': 11, 'december': 12
    };

    const month = months[monthName.toLowerCase()];
    if (!month) return null;

    // Pad with 0
    const mStr = month.toString().padStart(2, '0');
    const dStr = day.toString().padStart(2, '0');

    return `${year}-${mStr}-${dStr}`;
}

export function getLast100Days(): string[] {
    const dates: string[] = [];
    const today = new Date();

    for (let i = 0; i < 100; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);

        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');

        dates.push(`${year}-${month}-${day}`);
    }

    return dates;
}
