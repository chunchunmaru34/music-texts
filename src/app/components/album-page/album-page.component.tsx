import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import * as styles from './album-page.styles.scss';

import * as albumService from '@services/album/album.service';
import { Album } from '@models/album.model';
import { ArtistAlbumsContainer } from '../artist-albums/artist-albums.container';
import { LoadingWrapper } from '../loading-wrapper/loading-wrapper.component';
import { AlbumInfo } from './album-info.component/album-info.component';

type RouteParams = { id: string };

const AlbumPageComponent = ({ match }: RouteComponentProps<RouteParams>) => {
    const albumId = match.params.id;

    const [album, setAlbum] = React.useState<Album>();

    React.useEffect(() => {
        albumService.getAlbum(albumId).then(setAlbum);
    }, [match]);

    return (
        <LoadingWrapper isLoading={!album}>
            <div
                className={`content-container ${styles['album-page-container']}`}
            >
                <AlbumInfo album={album} />
                <div className={styles['artist-albums-container']}>
                    {album.artists.map(artist => (
                        <ArtistAlbumsContainer
                            key={artist.id}
                            artistId={artist.id}
                        />
                    ))}
                </div>
            </div>
        </LoadingWrapper>
    );
};

export default AlbumPageComponent;
