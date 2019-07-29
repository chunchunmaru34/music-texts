import { SpotifyDto } from './spotify-dto.model';
import { Artist } from '@app/models/artist.model';
import { Album } from '@app/models/album.model';
import { toCamelCase } from '@app/utils';

export class Track extends SpotifyDto {
  album: Album;
  artists: Artist[];
  availableMarkets: string[];
  discNumber: number;
  durationMs: number;
  episode: boolean;
  explicit: boolean;
  externalIds: any;
  externalUrls: any;
  id: string;
  isLocal: boolean;
  name: string;
  popularity: number;
  previewUrl: string;
  track: boolean;
  trackNumber: number

  constructor(dto?: any) {
    super();

    if (dto) {
      const camelCased = toCamelCase(dto);

      Object.assign(this, camelCased);
    }
  }
}