import { MusicGenre } from './music-genre.interface';

export interface Track {
  albumId: number;
  albumName: string;
  artistId: number;
  commontrackId: number;
  explicit: boolean;
  hasLyrics: boolean;
  hasRichsync: boolean;
  instrumental: boolean;
  numFavourite: number;
  primaryGenres: {
    musicGenreList: Array<{ musicGenre: MusicGenre }>
  };
  restricted: boolean;
  trackId: number;
  trackName: string;
  trackNameTranslationList: Array<any>;
  trackRating: number;
}