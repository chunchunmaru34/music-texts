import { ArtistSimple } from './artiist-simple.model';
import { SpotifyDto } from './spotify-dto.model';
import { toCamelCase } from '@app/utils';
import { AlbumSimple } from './album-simple.model';

export class Track extends SpotifyDto {
    album: AlbumSimple;
    artists: ArtistSimple[];
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
    trackNumber: number;

    constructor(dto?: any) {
        super();

        if (dto) {
            const camelCased = toCamelCase(dto);

            Object.assign(this, camelCased);
        }
    }
}
