// Omakanta API -kutsut


export async function getOmakantaStats() {
  const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats');

  if (!res.ok) {
    throw new Error(`Stats haku epäonnistui: ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    throw new Error(`API ei palauttanut JSONia. Alku: ${text.slice(0, 80)}`);
  }

  return res.json();
}
