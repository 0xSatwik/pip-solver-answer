
import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
    DB: D1Database;
    SECRET_KEY: string;
    GEMINI_API_KEYS: string;
};

// Disable strict mode so /date/2025-12-15/ matches /date/2025-12-15
const app = new Hono<{ Bindings: Bindings }>({ strict: false });

// CORS configuration - whitelist allowed origins
app.use('*', cors({
    origin: ['http://localhost:3000', 'https://pipsanswer.vercel.app'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
}));

function getETDate(offsetDays: number = 0): string {
    const date = new Date();
    const etDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    etDate.setDate(etDate.getDate() + offsetDays);

    const y = etDate.getFullYear();
    const m = String(etDate.getMonth() + 1).padStart(2, '0');
    const d = String(etDate.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// Ensure date is always YYYY-MM-DD
function normalizeDate(d: string): string {
    return d.trim().replace(/\/$/, ''); // Remove trailing slash if caught in param
}

function removeSolutions(data: any): any {
    if (!data) return data;
    const clean = JSON.parse(JSON.stringify(data));

    ['easy', 'medium', 'hard'].forEach(diff => {
        if (clean[diff] && clean[diff].solution) {
            delete clean[diff].solution;
        }
    });
    return clean;
}

// AI Generation Helper
async function generateAIExplanation(data: any, env: Bindings): Promise<string | null> {
    if (!env.GEMINI_API_KEYS) {
        console.error("GEMINI_API_KEYS secret is missing.");
        return null;
    }

    const rawKeys = env.GEMINI_API_KEYS;
    const keys = rawKeys.split(/[\n,]+/).map(k => k.trim().replace(/^["']|["']$/g, '')).filter(k => k.length > 5);

    if (keys.length === 0) {
        console.error("No valid Gemini API keys found.");
        return null;
    }

    for (let i = keys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [keys[i], keys[j]] = [keys[j], keys[i]];
    }

    const systemPrompt = `
    You are an expert NYT Pips puzzle solver and analyst. 
    Analyze the following Pips puzzle data for date ${data.printDate}:
    
    ${JSON.stringify(data)}

    Write a detailed expert analysis in JSON format with the following structure and try to make it as detailed and big as you can and write like you are a real human who solved it and explaining it and use most daily used words not too much hard words (do not use markdown):
    {
        "how_solved": "First-person narrative of how you expert solved it, strategies used, and walkthrough.",
        "learned": "What you learned, interesting patterns, or tricky moves.",
        "faqs": [
            {"question": "Common user question?", "answer": "Answer"}
        ]
    }
    Strictly return ONLY the JSON string.
    `;

    for (const apiKey of keys) {
        try {
            console.log(`Attempting Gemini generation with key ending in ...${apiKey.slice(-4)}`);
            // STRICTLY using gemini-3-flash-preview as requested
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }]
                })
            });

            if (response.ok) {
                const result = await response.json() as any;
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    return text.replace(/```json\n?|```/g, '').trim();
                }
                console.warn(`Gemini returned 200 but no text. Response: ${JSON.stringify(result)}`);
                return null;
            } else {
                if (response.status === 429) {
                    console.warn(`Key 429 Rate Limit.`);
                    continue;
                }
                console.error(`Gemini API Error ${response.status}`);
                if (response.status >= 500) continue;
            }

        } catch (e) {
            console.error("Gemini Network Error:", e);
            continue;
        }
    }
    return null;
}

// --- Management ---

app.get('/add/:date/:key', async (c) => {
    let date = normalizeDate(c.req.param('date'));
    const key = c.req.param('key');

    // Validate Date Format YYYY-MM-DD
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return c.json({ error: 'Invalid date format. Use YYYY-MM-DD.' }, 400);
    }

    if (key !== c.env.SECRET_KEY) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        const response = await fetch(`https://www.nytimes.com/svc/pips/v1/${date}.json`);
        if (!response.ok) {
            return c.json({ error: 'Failed to fetch data from NYT', status: response.status }, 500);
        }
        const data = await response.json() as any;

        const editor = data.editor || '';
        const constructorsSet = new Set<string>();
        ['easy', 'medium', 'hard'].forEach(diff => {
            if (data[diff] && data[diff].constructors) {
                constructorsSet.add(data[diff].constructors);
            }
        });
        const constructors = Array.from(constructorsSet).join(', ');

        // Generate AI Explanation - REQUIRED
        let explanation = null;
        try {
            explanation = await generateAIExplanation(data, c.env);
        } catch (aiError) {
            console.error("AI Error:", aiError);
            return c.json({
                error: 'Failed to generate AI explanation. Please try again later.',
                details: 'AI service encountered an error'
            }, 503);
        }

        // If explanation generation failed (all keys exhausted/rate limited), don't add to database
        if (!explanation) {
            console.error("AI explanation generation failed - all API keys exhausted or rate limited");
            return c.json({
                error: 'Failed to generate AI explanation due to rate limiting or API issues. Data not saved.',
                details: 'All Gemini API keys are rate limited or failed. Please try again later.'
            }, 429);
        }

        const jsonString = JSON.stringify(data);

        try {
            await c.env.DB.prepare(
                `INSERT OR REPLACE INTO pips (date, data, editor, constructors, explanation) VALUES (?, ?, ?, ?, ?)`
            ).bind(date, jsonString, editor, constructors, explanation).run();
        } catch (dbError: any) {
            console.error("DB Insert Error:", dbError);
            return c.json({ error: `Database Error: ${dbError.message}` }, 500);
        }

        return c.json({
            success: true,
            date,
            message: 'Data added successfully with AI explanation',
            explanation_generated: true
        });

    } catch (e: any) {
        console.error("Handler Error:", e);
        return c.json({ error: e.message }, 500);
    }
});

app.get('/delete/:date/:key', async (c) => {
    const date = normalizeDate(c.req.param('date'));
    const key = c.req.param('key');

    if (key !== c.env.SECRET_KEY) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    try {
        await c.env.DB.prepare('DELETE FROM pips WHERE date = ?').bind(date).run();
        return c.json({ success: true, date, message: 'Data deleted successfully' });
    } catch (e: any) {
        return c.json({ error: e.message }, 500);
    }
});

// --- Retrieval ---

function formatResponse(row: any) {
    if (!row) return null;
    const data = JSON.parse(row.data);
    let explanation = null;
    try {
        if (row.explanation) {
            explanation = JSON.parse(row.explanation);
        }
    } catch (e) {
        explanation = row.explanation;
    }

    return {
        ...data,
        explanation
    };
}

app.get('/date/:date', async (c) => {
    const date = normalizeDate(c.req.param('date'));
    // Logging for debug
    console.log(`Fetching date: [${date}]`);

    const result = await c.env.DB.prepare('SELECT data, explanation FROM pips WHERE date = ?').bind(date).first();

    if (!result) {
        return c.json({ error: `Not found for date: ${date}` }, 404);
    }
    return c.json(formatResponse(result));
});

app.get('/date/:date/:difficulty', async (c) => {
    const date = normalizeDate(c.req.param('date'));
    const difficulty = c.req.param('difficulty');

    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
        return c.json({ error: 'Invalid difficulty' }, 400);
    }

    const result = await c.env.DB.prepare('SELECT data, explanation FROM pips WHERE date = ?').bind(date).first();

    if (!result) {
        return c.json({ error: 'Not found' }, 404);
    }

    const fullData = formatResponse(result);
    if (!fullData[difficulty]) {
        return c.json({ error: `Difficulty ${difficulty} not found` }, 404);
    }

    return c.json({
        ...fullData[difficulty],
        explanation: fullData.explanation
    });
});

app.get('/id/:id', async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) return c.json({ error: 'Invalid ID' }, 400);

    // Search query
    const query = `
    SELECT date, data, explanation FROM pips 
    WHERE json_extract(data, '$.easy.id') = ? 
       OR json_extract(data, '$.medium.id') = ? 
       OR json_extract(data, '$.hard.id') = ?
    LIMIT 1
  `;

    const result = await c.env.DB.prepare(query).bind(id, id, id).first();
    if (!result) return c.json({ error: 'Puzzle ID not found' }, 404);

    const formatted = formatResponse(result);

    let puzzle = null;
    let difficulty = '';
    if (formatted.easy?.id === id) { puzzle = formatted.easy; difficulty = 'easy'; }
    else if (formatted.medium?.id === id) { puzzle = formatted.medium; difficulty = 'medium'; }
    else if (formatted.hard?.id === id) { puzzle = formatted.hard; difficulty = 'hard'; }

    return c.json({
        date: result.date,
        difficulty,
        puzzle,
        explanation: formatted.explanation
    });
});

app.get('/today', async (c) => {
    const date = getETDate(0);
    const result = await c.env.DB.prepare('SELECT data, explanation FROM pips WHERE date = ?').bind(date).first();
    if (!result) return c.json({ error: 'Not found for today (' + date + ')' }, 404);
    return c.json(formatResponse(result));
});

app.get('/yesterday', async (c) => {
    const date = getETDate(-1);
    const result = await c.env.DB.prepare('SELECT data, explanation FROM pips WHERE date = ?').bind(date).first();
    if (!result) return c.json({ error: 'Not found for yesterday (' + date + ')' }, 404);
    return c.json(formatResponse(result));
});

app.get('/list', async (c) => {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const offset = (page - 1) * limit;

    const { results } = await c.env.DB.prepare(
        'SELECT date, data, explanation FROM pips ORDER BY date DESC LIMIT ? OFFSET ?'
    ).bind(limit, offset).all();

    if (!results) return c.json([]);

    const cleanResults = results.map((r: any) => {
        const formatted = formatResponse(r);
        return {
            date: r.date,
            data: removeSolutions(formatted),
        };
    });

    return c.json(cleanResults);
});

app.get('/search/region/:type', async (c) => {
    const type = c.req.param('type');
    const { results } = await c.env.DB.prepare(
        `SELECT date, data, explanation FROM pips WHERE data LIKE ? ORDER BY date DESC LIMIT 50`
    ).bind(`%"type":"${type}"%`).all();

    if (!results || results.length === 0) {
        const { results: resultsSpace } = await c.env.DB.prepare(
            `SELECT date, data, explanation FROM pips WHERE data LIKE ? ORDER BY date DESC LIMIT 50`
        ).bind(`%"type": "${type}"%`).all();

        if (!resultsSpace || resultsSpace.length === 0) return c.json([]);
        return c.json(resultsSpace.map(formatResponse));
    }

    return c.json(results.map(formatResponse));
});

app.get('/constructor/:name', async (c) => {
    const name = c.req.param('name');
    const { results } = await c.env.DB.prepare(
        'SELECT date, data, explanation FROM pips WHERE constructors LIKE ? ORDER BY date DESC LIMIT 50'
    ).bind(`%${name}%`).all();

    if (!results) return c.json([]);
    return c.json(results.map(formatResponse));
});

app.get('/editor/:name', async (c) => {
    const name = c.req.param('name');
    const { results } = await c.env.DB.prepare(
        'SELECT date, data, explanation FROM pips WHERE editor LIKE ? ORDER BY date DESC LIMIT 50'
    ).bind(`%${name}%`).all();

    if (!results) return c.json([]);
    return c.json(results.map(formatResponse));
});

app.get('/', (c) => c.text('Pips Worker API is running.'));

// Helper function to generate AI explanation with a specific key index for load balancing
async function generateAIExplanationWithKeyIndex(data: any, env: Bindings, keyIndex: number): Promise<string | null> {
    if (!env.GEMINI_API_KEYS) {
        console.error("GEMINI_API_KEYS secret is missing.");
        return null;
    }

    const rawKeys = env.GEMINI_API_KEYS;
    const keys = rawKeys.split(/[\n,]+/).map(k => k.trim().replace(/^["']|["']$/g, '')).filter(k => k.length > 5);

    if (keys.length === 0) {
        console.error("No valid Gemini API keys found.");
        return null;
    }

    // Rotate starting index based on keyIndex parameter to distribute load
    const startIndex = keyIndex % keys.length;
    const rotatedKeys = [...keys.slice(startIndex), ...keys.slice(0, startIndex)];

    const systemPrompt = `
    You are an expert NYT Pips puzzle solver and analyst. 
    Analyze the following Pips puzzle data for date ${data.printDate}:
    
    ${JSON.stringify(data)}

    Write a detailed expert analysis in JSON format with the following structure and try to make it as detailed and big as you can and write like you are a real human who solved it and explaining it and use most daily used words not too much hard words (do not use markdown):
    {
        "how_solved": "First-person narrative of how you expert solved it, strategies used, and walkthrough.",
        "learned": "What you learned, interesting patterns, or tricky moves.",
        "faqs": [
            {"question": "Common user question?", "answer": "Answer"}
        ]
    }
    Strictly return ONLY the JSON string.
    `;

    for (const apiKey of rotatedKeys) {
        try {
            console.log(`[Cron] Attempting Gemini generation with key ending in ...${apiKey.slice(-4)}`);
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: systemPrompt }] }]
                })
            });

            if (response.ok) {
                const result = await response.json() as any;
                const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    return text.replace(/```json\n?|```/g, '').trim();
                }
                console.warn(`[Cron] Gemini returned 200 but no text.`);
                return null;
            } else {
                if (response.status === 429) {
                    console.warn(`[Cron] Key 429 Rate Limit, trying next key.`);
                    continue;
                }
                console.error(`[Cron] Gemini API Error ${response.status}`);
                if (response.status >= 500) continue;
            }

        } catch (e) {
            console.error("[Cron] Gemini Network Error:", e);
            continue;
        }
    }
    return null;
}

// Add a single date to database (helper for scheduled handler)
async function addDateToDatabase(date: string, env: Bindings, keyIndex: number): Promise<{ success: boolean; message: string }> {
    try {
        // Check if date already exists
        const existing = await env.DB.prepare('SELECT 1 FROM pips WHERE date = ?').bind(date).first();
        if (existing) {
            return { success: true, message: `Date ${date} already exists, skipping.` };
        }

        // Fetch from NYT API
        const response = await fetch(`https://www.nytimes.com/svc/pips/v1/${date}.json`);
        if (!response.ok) {
            return { success: false, message: `Failed to fetch NYT data for ${date}: ${response.status}` };
        }
        const data = await response.json() as any;

        // Extract editor and constructors
        const editor = data.editor || '';
        const constructorsSet = new Set<string>();
        ['easy', 'medium', 'hard'].forEach(diff => {
            if (data[diff] && data[diff].constructors) {
                constructorsSet.add(data[diff].constructors);
            }
        });
        const constructors = Array.from(constructorsSet).join(', ');

        // Generate AI Explanation with specific key index for load balancing
        const explanation = await generateAIExplanationWithKeyIndex(data, env, keyIndex);
        if (!explanation) {
            return { success: false, message: `Failed to generate AI explanation for ${date} - all keys exhausted.` };
        }

        const jsonString = JSON.stringify(data);

        // Insert into database
        await env.DB.prepare(
            `INSERT OR REPLACE INTO pips (date, data, editor, constructors, explanation) VALUES (?, ?, ?, ?, ?)`
        ).bind(date, jsonString, editor, constructors, explanation).run();

        return { success: true, message: `Successfully added ${date} with AI explanation.` };

    } catch (e: any) {
        return { success: false, message: `Error processing ${date}: ${e.message}` };
    }
}

// Scheduled event handler - runs at 12:00 AM UTC daily
async function handleScheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext): Promise<void> {
    console.log('[Cron] Scheduled task started at', new Date().toISOString());

    try {
        // Get the latest date from the database
        const latestResult = await env.DB.prepare('SELECT MAX(date) as latest_date FROM pips').first() as { latest_date: string | null };

        if (!latestResult || !latestResult.latest_date) {
            console.log('[Cron] No data in database. Using today as base date.');
            // If no data exists, use today's date as base
            const today = new Date();
            const y = today.getUTCFullYear();
            const m = String(today.getUTCMonth() + 1).padStart(2, '0');
            const d = String(today.getUTCDate()).padStart(2, '0');
            latestResult.latest_date = `${y}-${m}-${d}`;
        }

        console.log('[Cron] Latest date in database:', latestResult.latest_date);

        // Parse the latest date and calculate next 2 days
        const latestDate = new Date(latestResult.latest_date + 'T00:00:00Z');
        const datesToAdd: string[] = [];

        for (let i = 1; i <= 2; i++) {
            const nextDate = new Date(latestDate);
            nextDate.setUTCDate(nextDate.getUTCDate() + i);
            const y = nextDate.getUTCFullYear();
            const m = String(nextDate.getUTCMonth() + 1).padStart(2, '0');
            const d = String(nextDate.getUTCDate()).padStart(2, '0');
            datesToAdd.push(`${y}-${m}-${d}`);
        }

        console.log('[Cron] Dates to process:', datesToAdd);

        // Process each date with a different key index for load balancing
        for (let i = 0; i < datesToAdd.length; i++) {
            const date = datesToAdd[i];
            console.log(`[Cron] Processing date ${date} with key index ${i}`);

            const result = await addDateToDatabase(date, env, i);
            console.log(`[Cron] ${result.message}`);
        }

        console.log('[Cron] Scheduled task completed successfully.');

    } catch (e: any) {
        console.error('[Cron] Scheduled task failed:', e.message);
    }
}

// Manual trigger endpoint for testing (protected by secret key)
app.get('/trigger-cron/:key', async (c) => {
    const key = c.req.param('key');
    if (key !== c.env.SECRET_KEY) {
        return c.json({ error: 'Unauthorized' }, 401);
    }

    // Create a mock scheduled event and execution context
    const mockEvent = { scheduledTime: Date.now(), cron: '0 0 * * *' } as ScheduledEvent;
    const mockCtx = { waitUntil: (p: Promise<any>) => { } } as ExecutionContext;

    // Run the scheduled handler
    await handleScheduled(mockEvent, c.env, mockCtx);

    return c.json({ success: true, message: 'Cron job triggered manually. Check logs for details.' });
});

export default {
    fetch: app.fetch,
    scheduled: handleScheduled,
};
