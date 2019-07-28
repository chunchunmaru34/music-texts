import axios from 'axios';

import { SPOTIFY_API_URL } from '@app/constants/api';
import { Track } from '@models/track.model';

const http = axios.create({ baseURL: SPOTIFY_API_URL, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`} });


export async function getTopTracks(limit?: number): Promise<Track[]> {
  let tracks = [];
  try {
    let params = {};
    Object.assign(params, { limit });

    tracks = await http.get('playlists/37i9dQZEVXbMDoHDwVN2tF/tracks', { params });
    tracks = (tracks as any).data.items.map(dto => new Track(dto.track));
  } catch (error) {
    console.log(error);
  }

  return tracks;
}