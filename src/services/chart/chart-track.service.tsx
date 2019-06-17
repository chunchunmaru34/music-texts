import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { API_URL } from '../../constants/api';
import { toCamelCase } from '../../utils/index';

const http = axios.create({ adapter: jsonpAdapter });

export async function getTopSongs() {
  return http.get(API_URL + 'chart.tracks.get', { params: {
    format: 'jsonp',
    country: 'us',
    'chart_name': 'top',
    apikey: '',
    callback: 'parseApiResponse'
  }}).then(response => {
    const data = eval(response.data);
    const { trackList } = toCamelCase(data.message.body);

    return trackList.map((track: any) => track.track);
  });
}