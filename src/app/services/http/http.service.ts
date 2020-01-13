import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { SPOTIFY_API_URL, MUSIXPAMATCH_API_URL } from '@app/constants/api';
import {
    refreshToken,
    getAccessTokenFromStorage
} from '@app/services/authentication/authentication.service';

export const httpSpotify = axios.create({ baseURL: SPOTIFY_API_URL });
export const httpMusixmatch = axios.create({
    baseURL: MUSIXPAMATCH_API_URL,
    adapter: jsonpAdapter
});

httpSpotify.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            const accessToken = getAccessTokenFromStorage();

            if (accessToken) {
                refreshToken();
            }
        }

        return error;
    }
);

httpSpotify.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${getAccessTokenFromStorage()}`;

    return config;
});
