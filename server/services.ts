import qs from 'querystring';
import axios from 'axios';

import {
  AUTH_CODE,
  REDIRECT_URI,
  API_URL
} from './constants';

export async function requestToken(code: string) {
  const body = qs.stringify({
    code,
    'grant_type': 'authorization_code',
    'redirect_uri': REDIRECT_URI
  });
  const options = { headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${AUTH_CODE}`
  }};

  const response = await axios.post(API_URL, body, options);

  const accessToken = response.data['access_token'];
  const refreshToken = response.data['refresh_token']
  const expiresInMs = response.data['expires_in'] * 1000;

  return { accessToken, refreshToken, expiresInMs };
}

export async function refreshToken(refreshTokenOld: string): Promise<{ accessToken: string, expiresInMs: number }> {
  const body = qs.stringify({
    'grant_type': 'refresh_token',
    'refresh_token': refreshTokenOld
  });
  const options = { headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${AUTH_CODE}`
  }};
  const response = await axios.post(`${API_URL}`, body, options);

  const accessToken = response.data['access_token'];
  const expiresInMs = response.data['expires_in'] * 1000;

  return { accessToken, expiresInMs };
}