export default async () => {
    try {
        const res = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.oref.org.il/',
                'Accept': 'application/json',
            }
        });

        if (!res.ok) {
            return new Response(JSON.stringify({ error: `Upstream ${res.status}` }), {
                status: 502,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const text = await res.text();

        // Validate JSON if non-empty
        if (text && text.trim().length > 0) {
            try {
                JSON.parse(text);
            } catch {
                return new Response(JSON.stringify({ error: 'Invalid JSON from upstream' }), {
                    status: 502,
                    headers: { 'Content-Type': 'application/json' }
                });
            }
        }

        return new Response(text || '{}', {
            status: 200,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Cache-Control': 'no-cache, no-store',
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch alerts' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
