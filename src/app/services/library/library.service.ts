import { httpSpotify } from '@services/http/http.service';
import { SPOTIFY_API_URL } from '@app/constants/api';
import { SavedTrack } from '@app/models/saved-track.model';

export async function getUserTracks(params?: { limit?: number, offset?: number }): Promise<SavedTrack[]> {
  const response = await httpSpotify.get<PagingObject<any>>(`${SPOTIFY_API_URL}me/tracks`, { params });

  const tracks = response.data.items.map(item => new SavedTrack(item));

  return tracks;
}