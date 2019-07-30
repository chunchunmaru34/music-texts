import axios from 'axios';

import { SPOTIFY_API_URL } from '@constants/api';
import { Track } from '@app/models/track.model';

const http = axios.create({ baseURL: SPOTIFY_API_URL });

export async function getAlbumTracks(albumId: string): Promise<Track[]> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  const result = await http.get(`albums/${albumId}`, { headers });

  return result.data.tracks.items;
}