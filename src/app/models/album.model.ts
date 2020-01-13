import { ArtistSimple } from './artiist-simple.model';
import { AlbumCover } from '@app/interfaces/album-cover.interface';
import { toCamelCase } from '@app/utils';
import { SpotifyDto } from './spotify-dto.model';
import { TrackSimple } from './track-simple.model';

export class Album extends SpotifyDto {
    albumType: string;
    artists: ArtistSimple[];
    availableMarkets: string[];
    copyrights: any[];
    genres: string[];
    label: string;
    popularity: number;
    tracks: TrackSimple[];
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
