import axios from 'axios';

import { SPOTIFY_CLIENT_ID } from "@app/constants/api";
import { getQueryStringValue, isServer } from "@app/utils";
// import { getStore } from '@app/store';
import { authenticated, tokenRefreshed } from '@app/actions/auth.actions';
import { cookieUtil } from '@app/utils/cookies';

const apiUrl = 'http://localhost:8081/api';

// export async function getToken(code: string): Promise<void> {
//   try {
//     const response = await axios.get(`${apiUrl}/token/${code}`);
//     const { accessToken, refreshToken, expiresInMs } = response.data;

//     getStore().dispatch(authenticated({ accessToken, refreshToken }));

//     saveAccessToken(accessToken);
//     saveRefreshToken(refreshToken);
//   } catch (error) {
//     console.log('authorization_error');
//   }
// }

export async function refreshToken() {
  const oldRefreshToken = getRefreshTokenFromStorage();

  try {
    const response = await axios.post(`${apiUrl}/token/refresh`, { refreshToken: oldRefreshToken });
    const { accessToken, expiresInMs } = response.data;

    // getStore().dispatch(tokenRefreshed(accessToken));

    saveAccessToken(accessToken);
  } catch (error) {
    console.log('authorization_error');
  }
}

export function getAccessTokenFromStorage(): string {
  if (!isServer()) {
    // return localStorage.getItem('accessToken');
    return cookieUtil.getItem('accessToken');
  }
}

export function getRefreshTokenFromStorage(): string {
  if (!isServer()) {
    // return localStorage.getItem('refreshToken');
    return cookieUtil.getItem('refreshToken');
  }
}

function saveAccessToken(accessToken: string): void {
  if (!isServer()) {
    // localStorage.setItem('accessToken', accessToken);
    cookieUtil.setItem('accessToken', accessToken, Infinity);
  }
}

function saveRefreshToken(refreshToken: string): void {
  if (!isServer()) {
    // localStorage.setItem('refreshToken', refreshToken);
    cookieUtil.setItem('refreshToken', refreshToken, Infinity);
  }
}