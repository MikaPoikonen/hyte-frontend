// Omakanta API -kutsut oman id haku
export async function getMyId() {
  

	let headers = {};
	let token = localStorage.getItem('token');
	//console.log(token);
	if (token) {
		headers = { Authorization: `Bearer ${localStorage.token}` };
	}
	const options = {
		headers: headers,
	};
  const res = await fetch('http://127.0.0.1:3000/api/users/me', options );
  if (!res.ok) {
    throw new Error(`Stats haku epäonnistui: ${res.status}`);

  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    //console.log(text)
    ;
    throw new Error(`API ei palauttanut JSONia. Alku: ${text.slice(0, 80)}`);
  }

  return res.json();
}










// Tietokannasta tapahtumien haku
export async function getOmakantaStats() {
  //const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats');

	let headers = {};
	let token = localStorage.getItem('token');
	//console.log(token);
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

// Päiväkirjamerkinnän lisääminen
export async function postDailyStats(payload) {
  const token = localStorage.getItem('token');
  //console.log(token);

  if (!token) {
    throw new Error('Token puuttuu');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload),
  };

  const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats', options);

  if (!res.ok) {
    const text = await res.text();
    console.log('POST error body:', text);
    throw new Error(`Stats lisäys epäonnistui: ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.log(text);
    throw new Error(`API ei palauttanut JSONia. Alku: ${text.slice(0, 80)}`);
  }

  return await res.json();
}


// Päiväkirjamerkinnän päivittäminen
export async function putDailyStats(payload) {
  let token = localStorage.getItem('token');
  //console.log(token);

  if (!token) {
    throw new Error('Token puuttuu');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify(payload),
  };

  const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats', options);

  if (!res.ok) {
    throw new Error(`Stats päivitys epäonnistui: ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.log(text);
    throw new Error(`API ei palauttanut JSONia. Alku: ${text.slice(0, 80)}`);
  }

  return await res.json();
}



// Päiväkirjamerkinnän päivittäminen
export async function deleteDailyStat(payload) {
  let token = localStorage.getItem('token');
  //console.log(token);

  if (!token) {
    throw new Error('Token puuttuu');
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const options = {
    method: 'DELETE',
    headers: headers,
    body: JSON.stringify(payload),
  };

  const res = await fetch('http://127.0.0.1:3000/api/omakanta/stats', options);

  if (!res.ok) {
    throw new Error(`Stats päivitys epäonnistui: ${res.status}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    const text = await res.text();
    console.log(text);
    throw new Error(`API ei palauttanut JSONia. Alku: ${text.slice(0, 80)}`);
  }

  return await res.json();
}



