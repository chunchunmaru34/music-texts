import axios from 'axios';

import { SPOTIFY_API_URL } from '@constants/api';
import { TrackSearchTypesEnum } from '@enums/track-search-types.enum';
import { Track } from '@app/models/track.model';

const http = axios.create({ baseURL: SPOTIFY_API_URL, headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}`} });


export async function searchTracks(
  query: string,
  options: {
    includeTypes?: Set<TrackSearchTypesEnum>,
    limit?: number
  } = {}
): Promise<Track[]> {
  const { limit, includeTypes = new Set([TrackSearchTypesEnum.TRACK]) } = options;
  const params = { q: query, type: [...includeTypes].join(','), limit };

  let result = [];

  result = await http.get('search', { params });
  result = (result as any).data.tracks.items.map(item => new Track(item));

  return result;
}