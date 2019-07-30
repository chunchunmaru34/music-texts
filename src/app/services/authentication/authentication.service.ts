import axios from 'axios';

import { SPOTIFY_CLIENT_SECRET, SPOTIFY_CLIENT_ID } from "@app/constants/api";
import { getQueryStringValue } from "@app/utils";
import { httpSpotify } from '@services/http/http.service';

const apiUrl = 'http://localhost:8081/api';
const redirectUrl = 'http://localhost:8081';

httpSpotify.interceptors.response.use((response) => response, (error) => {
  if (error.status === 401) {
    localStorage.removeItem('access_token');
    getToken(localStorage.getItem('refresh_token'));
  }

  return error;
});

httpSpotify.interceptors.request.use((config) => {
  config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;

  return config;
})


export function redirectiToAuthPage() {
  window.open(`https://accounts.spotify.com/authorize?client_id=${SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}&scope=user-read-email`, 'no-open');
}

export async function getToken(code): Promise<void> {
  try {
    const response = await axios.get(`${apiUrl}/token/${code}`);
    const { accessToken, refreshToken, expiresInMs } = response.data;

    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('refresh_token', refreshToken);

    if (expiresInMs) {
      setTimeout(() => {
        getToken(refreshToken);
      }, expiresInMs);
    }

  } catch (error) {
    console.log('authorization_error');
  }
}

export function authorize(): void {
  const token = localStorage.getItem('access_token');;
  const code = getQueryStringValue('code');

  if (token) {
    return;
  } else if (code) {
    getToken(code);
  } else {
    redirectiToAuthPage();
  }
}