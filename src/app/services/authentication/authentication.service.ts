import axios from 'axios';

import { isServer } from '@app/utils';
import { cookieUtil } from '@app/utils/cookies';

const apiUrl = 'http://localhost:8081/api';

export async function refreshToken() {
    const oldRefreshToken = getRefreshTokenFromStorage();

    try {
        const response = await axios.post(`${apiUrl}/token/refresh`, {
            refreshToken: oldRefreshToken
        });
        const { accessToken } = response.data;

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
