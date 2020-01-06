import {  MUSIXMATCH_API_KEY } from '@constants/api';
import { TrackSearchTypesEnum } from '@enums/track-search-types.enum';
import { Track } from '@app/models/track.model';
import { Lyrics } from '@app/models/lyrics.model';
import { httpSpotify, httpMusixmatch } from '@app/services/http/http.service';
import { memoize } from '@app/utils';


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

  let result = [];

  result = await httpSpotify.get('search', { params });
  result = (result as any).data.tracks.items.map(item => new Track(item));

  return result;
}

export const searchLyrics = memoize(async (trackName: string, artist: string) => {
  const params = {
    'q_track': trackName,
    'q_artist': artist,
    ...musixmatchParams
  }

  let response: any = await httpMusixmatch.get('matcher.lyrics.get', { params: params });
  const lyrics = new Lyrics(eval(response.data).message.body.lyrics);

  return lyrics;
});

export const getTopTracks = memoize(async (limit?: number): Promise<Track[]> => {
  let tracks = [];
  const params = { limit };

  tracks = await httpSpotify.get('playlists/37i9dQZEVXbMDoHDwVN2tF/tracks', { params });
  tracks = (tracks as any).data.items.map(dto => new Track(dto.track));

  return tracks;
});

export const getTracks = memoize(async (ids: string[]): Promise<Track[]> => {
  const params = { ids: ids.join(',') };

  const response = await httpSpotify.get('tracks', { params });

  return response.data.tracks.map(item => new Track(item));
});

export async function getTrack(id: string): Promise<Track> {
  return getTracks([id]).then(tracks => tracks[0]);
}