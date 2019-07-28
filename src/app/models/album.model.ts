import { Artist } from '@app/models/artist.model';
import { AlbumCover } from '@app/interfaces/album-cover.interface';
import { toCamelCase } from '@app/utils';
import { SpotifyDto } from './spotify-dto.model';

export class Album extends SpotifyDto {
  albumType: string;
  artists: Artist[];
  availableMarkets: string[];
  id: string;
  images: AlbumCover[];
  name: string;
  releaseDate: string;
  totalTracks: number;

  constructor(dto?: any) {
    super();

    if (dto) {
      const camelCased = toCamelCase(dto);

      Object.assign(this, camelCased);
    }
  }
}

