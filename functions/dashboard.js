export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const license = url.searchParams.get('license');

  if (!license) {
    return new Response('Missing license parameter', { status: 400 });
  }

  // 🔥 GANTI DENGAN URL GAS ANDA YANG SEBENARNYA
  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzAsdLKogUOXEoFogIfn3JPisuf3aXuwrmU3nc8sOPXMwVMGjVoOYstiCsUhezj5cc3HQ/exec';
  const targetUrl = `${GAS_URL}?page=dashboard&license=${encodeURIComponent(license)}`;

  try {
    const response = await fetch(targetUrl);
    const html = await response.text();

    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (error) {
    return new Response(`Failed to load dashboard: ${error.message}`, { status: 500 });
  }
}
