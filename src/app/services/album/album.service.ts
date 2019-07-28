import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { MUSIXPAMATCH_API_URL, MUSIXMATCH_API_KEY } from '@constants/api';
import { toCamelCase } from '@utils/index';
import { Album } from '@app/models/album.model';

const http = axios.create({ adapter: jsonpAdapter });

export async function getAlbum(albumId: number): Promise<Album> {
  return http.get(MUSIXPAMATCH_API_URL + 'album.get', { params: {
    format: 'jsonp',
    album_id: albumId,
    apikey: MUSIXMATCH_API_KEY,
    callback: 'parseApiResponse'
  }}).then(response => {
    const data = eval(response.data);
    const { album } = toCamelCase(data.message.body);

    return album;
  });
}