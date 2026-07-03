export async function onRequest() {
  const URLS = [
    'https://p58-caldav.icloud.com/published/2/MTc5MjQxODIwMTc5MjQxODwAAW3ZHUhov4D1qVg32ftrpSHBx-jFXUoth4Qv1M__',
  ];

  const results = await Promise.all(URLS.map(u => fetch(u).then(r => r.text()).catch(() => '')));
  const combined = results.join('\n');

  return new Response(combined, {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
