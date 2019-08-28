import { httpSpotify } from '@services/http/http.service';
import { SPOTIFY_API_URL } from '@app/constants/api';
import { SavedTrack } from '@app/models/saved-track.model';

interface getUserTracksOptions {
  params?: { limit?: number, offset?: number },
  nextPage?: string
}

export async function getUserTracks(options?: getUserTracksOptions): Promise<PagingObject<SavedTrack>> {
  const { params = {}, nextPage = '' } = options || {};

  const url = nextPage || `${SPOTIFY_API_URL}me/tracks`;
  const response = await httpSpotify.get<PagingObject<SavedTrack>>(url, { params });

  const tracks = response.data.items.map(item => new SavedTrack(item));
  const pagingObject = response.data;
  pagingObject.items = tracks;

  return pagingObject;
}