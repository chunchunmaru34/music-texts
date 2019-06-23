import { Album } from './../../interfaces/album.interface';
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { API_URL, API_KEY } from '@constants/api';
import { toCamelCase } from '@utils/index';

const http = axios.create({ adapter: jsonpAdapter });

export async function getAlbum(albumId: number): Promise<Album> {
  return http.get(API_URL + 'album.get', { params: {
    format: 'jsonp',
    album_id: albumId,
    apikey: API_KEY,
    callback: 'parseApiResponse'
  }}).then(response => {
    const data = eval(response.data);
    const { album } = toCamelCase(data.message.body);

    return album;
  });
}