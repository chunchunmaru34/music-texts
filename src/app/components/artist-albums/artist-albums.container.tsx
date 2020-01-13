import * as React from 'react';

import * as artistService from '@services/artist/artist.service';
import { Artist } from '@app/models/artist.model';
import { Album } from '@app/models/album.model';
import { ArtistAlbumsComponent } from './artist-albums.component';
import { LoadingWrapper } from '../loading-wrapper/loading-wrapper.component';

type ArtistAlbumsContainerProps = {
    artistId: Artist['id'];
};

export const ArtistAlbumsContainer = ({
    artistId
}: ArtistAlbumsContainerProps) => {
    const [artistAlbums, setArtistAlbums] = React.useState<Album[]>();

    React.useEffect(() => {
        artistService.getArtistAlbums(artistId).then(setArtistAlbums);
    }, []);

    return (
        <LoadingWrapper isLoading={!artistAlbums}>
            <ArtistAlbumsComponent artistAlbums={artistAlbums} />
        </LoadingWrapper>
    );
};
