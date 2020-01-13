import { ArtistSimple } from './artiist-simple.model';
import { AlbumCover } from '@app/interfaces/album-cover.interface';
import { toCamelCase } from '@app/utils';
import { SpotifyDto } from './spotify-dto.model';

export class AlbumSimple extends SpotifyDto {
    albumType: string;
    artists: ArtistSimple[];
    availableMarkets: string[];
    id: string;
    images: AlbumCover[];
    name: string;
    releaseDate: string;

    constructor(dto?: any) {
        super();

        if (dto) {
            const camelCased = toCamelCase(dto);

            Object.assign(this, camelCased);
        }
    }
}
