import axios from 'axios';

const clientId = 'bb3e656da0034a318c9a3bb072e0d257';

const http = axios.create({
  baseURL: 'https://accounts.spotify.com/api',
  headers: {
    'Authorization': `Basic *${clientId}:${process.env.SPOTIFY_API_KEY}*`
  }
});

export function redirectiToAuthPage() {
  window.open(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:8080&scope=user-read-email`, 'no-open');
}

export async function authorize(code) {
  try {
    const response = await http.post('/token', {
      code,
      'grant_type': 'authorization_code',
      'redirect_uri': 'http://localhost:8080'
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }

}