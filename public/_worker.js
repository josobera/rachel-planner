const ICS_URLS = [
  'https://p58-caldav.icloud.com/published/2/MTc5MjQxODIwMTc5MjQxODwAAW3ZHUhov4D1qVg32ftrpSHBx-jFXUoth4Qv1M__',
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/calendar-proxy') {
      const results = await Promise.all(
        ICS_URLS.map(u => fetch(u).then(r => r.text()).catch(() => ''))
      );
      return new Response(results.join('\n'), {
        headers: {
          'Content-Type': 'text/calendar; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300',
        },
      });
    }

    return env.ASSETS.fetch(request);
  },
};
