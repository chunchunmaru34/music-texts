import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

import { SPOTIFY_API_URL, MUSIXPAMATCH_API_URL, MUSIXMATCH_API_KEY } from '@constants/api';
import { TrackSearchTypesEnum } from '@enums/track-search-types.enum';
import { Track } from '@app/models/track.model';
import { Lyrics } from '@app/models/lyrics.model';

const http = axios.create({ baseURL: SPOTIFY_API_URL });
const httpMusixmatch = axios.create({
  adapter: jsonpAdapter,
  baseURL: MUSIXPAMATCH_API_URL,
});
const musixmatchParams = {
  format: 'jsonp',
  apikey: MUSIXMATCH_API_KEY,
  callback: 'parseApiResponse'
}

export async function searchTracks(
  query: string,
  options: {
    includeTypes?: Set<TrackSearchTypesEnum>,
    limit?: number
  } = {}
): Promise<Track[]> {
  const { limit, includeTypes = new Set([TrackSearchTypesEnum.TRACK]) } = options;
  const params = { q: query, type: [...includeTypes].join(','), limit };
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  let result = [];

  result = await http.get('search', { params, headers });
  result = (result as any).data.tracks.items.map(item => new Track(item));

  return result;
}

export async function searchLyrics(trackName: string, artist: string) {
  const params = {
    'q_track': trackName,
    'q_artist': artist,
    ...musixmatchParams
  }

  let response: any = await httpMusixmatch.get('matcher.lyrics.get', { params: params });
  const lyrics = new Lyrics(eval(response.data).message.body.lyrics);

  return lyrics;
}

export async function getTopTracks(limit?: number): Promise<Track[]> {
  let tracks = [];
  const params = { limit };
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  tracks = await http.get('playlists/37i9dQZEVXbMDoHDwVN2tF/tracks', { params, headers });
  tracks = (tracks as any).data.items.map(dto => new Track(dto.track));

  return tracks;
}