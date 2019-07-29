import axios from 'axios';

import { SPOTIFY_API_URL } from '@constants/api';
import { Artist } from '@app/models/artist.model';
import { Album } from '@app/models/album.model';
import { Track } from '@app/models/track.model';

const http = axios.create({ baseURL: SPOTIFY_API_URL });


export async function getArtist(id: string): Promise<Artist> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  const result = await http.get(`artists/${id}`, { headers });
  const artist = new Artist(result.data);

  return artist;
}

export async function getArtistAlbums(id: string, options?: { limit: number }): Promise<Album[]> {
  const params = { ...options };
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  const result = await http.get(`artists/${id}/albums`, { headers, params });
  const albums = result.data.items.map(item => new Album(item));

  return albums;
}

export async function getArtistTopTracks(id: string): Promise<Track[]> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  const result = await http.get(`artists/${id}/albums`, { headers });
  const tracks = result.data.tracks.map(track => new Track(track));

  return tracks;
}

export async function getRelatedArtists(id: string): Promise<Artist[]> {
  const headers = { Authorization: `Bearer ${localStorage.getItem('access_token')}`};

  const result = await http.get(`artists/${id}/related-artists`, { headers });
  const artists = result.data.artists.map(item => new Artist(item));

  return artists;
}