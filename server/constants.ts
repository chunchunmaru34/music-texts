export const CLIENT_ID = 'bb3e656da0034a318c9a3bb072e0d257';
export const CLIENT_SECRET = process.env.SPOTIFY_API_KEY;
export const REDIRECT_URI = 'http://localhost:8081';
export const API_URL = 'https://accounts.spotify.com/api/token';
export const AUTH_CODE = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
export const SPOTIFY_REDIRECT_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-email%20user-library-read`;