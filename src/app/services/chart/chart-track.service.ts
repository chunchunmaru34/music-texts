import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { API_URL, API_KEY } from '@constants/api';
import { toCamelCase } from '@utils/index';
import { Track } from '@interfaces/track.interface';

const http = axios.create({ adapter: jsonpAdapter });

export async function getTopSongs(): Promise<Array<Track>> {
  return http.get(API_URL + 'chart.tracks.get', { params: {
    format: 'jsonp',
    country: 'us',
    'chart_name': 'top',
    apikey: API_KEY,
    callback: 'parseApiResponse'
  }}).then(response => {
    const data = eval(response.data);
    const { trackList } = toCamelCase(data.message.body);

    return trackList.map((track: any) => track.track);
  });
}