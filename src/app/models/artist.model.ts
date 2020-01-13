import { toCamelCase } from '@app/utils';
import { SpotifyDto } from './spotify-dto.model';
import { Image } from '@app/interfaces/image.interface';

export class Artist extends SpotifyDto {
    id: string;
    name: string;
    followers: any;
    genres: string[];
    images: Image[];
    popularity: number;

    constructor(dto?: any) {
        super();

        if (dto) {
            const camelCased = toCamelCase(dto);

            Object.assign(this, camelCased);
        }
    }
}
