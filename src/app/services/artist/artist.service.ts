import { Artist } from '@app/models/artist.model';
import { Album } from '@app/models/album.model';
import { Track } from '@app/models/track.model';
import { httpSpotify } from '@app/services/http/http.service'


export async function getArtist(id: string): Promise<Artist> {
  const result = await httpSpotify.get(`artists/${id}`);
  const artist = new Artist(result.data);

  return artist;
}

export async function getArtistAlbums(id: string, options?: { limit: number }): Promise<Album[]> {
  const params = { ...options };

  const result = await httpSpotify.get(`artists/${id}/albums`, { params });
  const albums = result.data.items.map(item => new Album(item));

  return albums;
}

export async function getArtistTopTracks(id: string, countryCode = 'US'): Promise<Track[]> {
  const result = await httpSpotify.get(`artists/${id}/top-tracks`, { params: { country: countryCode }});
  const tracks = result.data.tracks.map(track => new Track(track));

  return tracks;
}

export async function getRelatedArtists(id: string): Promise<Artist[]> {
  const result = await httpSpotify.get(`artists/${id}/related-artists`);
  const artists = result.data.artists.map(item => new Artist(item));

  return artists;
}