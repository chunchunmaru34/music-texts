import { MusicGenre } from './music-genre.interface';

export interface Album {
  id: number;
  mbid: string;
  name: string;
  rating: number;
  trackCount: number;
  releaseDate: string;
  releaseType: string;
  artistId: number;
  artistName: string;
  primaryGenres: { musicGenreList: Array<{ musicGenre: MusicGenre }> };
  secondaryGenres: { musicGenreList: Array<{ musicGenre: MusicGenre }> };
  pline: string;
  copyright: string;
  label: string;
  coverartUrl: string;
}