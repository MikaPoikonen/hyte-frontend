// Omakanta API -kutsut


export async function getOmakantaStats() {
  //const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats');

	let headers = {};
	let token = localStorage.getItem('token');
	console.log(token);
	if (token) {
		headers = { Authorization: `Bearer ${localStorage.token}` };
	}
	const options = {
		headers: headers,
	};
  const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats/me', options );
  if (!res.ok) {
    throw new Error(`Stats haku epäonnistui: ${res.status}`);

  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.log(text)
    ;
    throw new Error(`API ei palauttanut JSONia. Alku: ${text.slice(0, 80)}`);
  }

  return res.json();
}
