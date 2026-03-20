export default async () => {
    try {
        const res = await fetch('https://www.oref.org.il/WarningMessages/alert/alerts.json', {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.oref.org.il/',
                'Accept': 'application/json',
            }
        });

        const text = await res.text();

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
