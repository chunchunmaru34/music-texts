import { Track } from '@app/models/track.model';
import { httpSpotify } from '@app/services/http/http.service';
import { TrackSimple } from '@app/models/track-simple.model';


export async function getAlbumTracks(albumId: string): Promise<TrackSimple[]> {
  const result = await httpSpotify.get(`albums/${albumId}`);

  return result.data.tracks.items;
}