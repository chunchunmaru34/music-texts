import { httpSpotify } from '@app/services/http/http.service';
import { TrackSimple } from '@app/models/track-simple.model';
import { ArtistSimple } from '@app/models/artiist-simple.model';


export async function getAlbumTracks(albumId: string): Promise<TrackSimple[]> {
  const result = await httpSpotify.get(`albums/${albumId}/tracks`);

  return result.data.items.map(item => new ArtistSimple(item));
}