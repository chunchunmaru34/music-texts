import { toCamelCase } from '@app/utils';

export class Lyrics {
    id: string;
    restricted: boolean;
    instrumental: boolean;
    lyricsBody: string;
    lyricsLanguage: string;
    lyricsCopyright: string;

    constructor(dto?) {
        if (dto) {
            Object.assign(this, toCamelCase(dto));

            this.instrumental = !!this.instrumental;
            this.restricted = !!this.restricted;
        }
    }
}
