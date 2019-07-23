import { Track } from './../../interfaces/track.interface';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { API_URL, API_KEY } from '@constants/api';
import { toCamelCase } from '@utils/index';

const http = axios.create({ adapter: jsonpAdapter });

export async function searchTrack(query: string): Promise<Track> {
  return http.get(API_URL + 'track.search', { params: {
    format: 'jsonp',
    q_track_artist: query,
    apikey: API_KEY,
    callback: 'parseApiResponse'
  }}).then(response => {
    const data = eval(response.data);
    const { trackList } = toCamelCase(data.message.body);

    return trackList.map((track: any) => track.track);
  });
}