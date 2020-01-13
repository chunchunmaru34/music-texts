import { httpSpotify } from '@app/services/http/http.service';
import { TrackSimple } from '@app/models/track-simple.model';
import { ArtistSimple } from '@app/models/artiist-simple.model';
import { Album } from '@app/models/album.model';
import { memoize } from '@app/utils';

export const getAlbumTracks = memoize(
    async (albumId: string): Promise<TrackSimple[]> => {
        const result = await httpSpotify.get(`albums/${albumId}/tracks`);

        return result.data.items.map(item => new ArtistSimple(item));
    }
);

export const getAlbum = memoize(
    async (albumId: string): Promise<Album> => {
        const result = await httpSpotify.get(`albums/${albumId}`);

        result.data.tracks = result.data.tracks.items;

        return new Album(result.data);
    }
);
