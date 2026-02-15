export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const license = url.searchParams.get('license');

  if (!license) {
    return new Response('Missing license parameter', { status: 400 });
  }

  const GAS_URL = 'https://script.google.com/macros/s/AKfycbzAsdLKogUOXEoFogIfn3JPisuf3aXuwrmU3nc8sOPXMwVMGjVoOYstiCsUhezj5cc3HQ/exec';
  const targetUrl = `${GAS_URL}?page=dashboard&license=${encodeURIComponent(license)}`;

  try {
    const response = await fetch(targetUrl);
    const text = await response.text();
    // Logging sederhana: kembalikan teks beserta status
    return new Response(`Status dari GAS: ${response.status}\n\n${text}`, {
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
