import axios from 'axios';

import { API_URL } from '../../constants/api';

export async function getTopSongs() {
  return axios.get(API_URL + 'chart.tracks.get', { params: {
    'apikey': '',
    country: 'XW',
    'chart_name': 'top',
  }})
}