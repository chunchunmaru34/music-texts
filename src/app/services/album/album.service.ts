import { Track } from '@app/models/track.model';
import { httpSpotify } from '@app/services/http/http.service';


export async function getAlbumTracks(albumId: string): Promise<Track[]> {
  const result = await httpSpotify.get(`albums/${albumId}`);

  return result.data.tracks.items;
}