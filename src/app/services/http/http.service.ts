import axios from 'axios';
import { SPOTIFY_API_URL, MUSIXPAMATCH_API_URL } from '@app/constants/api';

export const httpSpotify = axios.create({ baseURL: SPOTIFY_API_URL });
export const httpMusixmatch = axios.create({ baseURL: MUSIXPAMATCH_API_URL });