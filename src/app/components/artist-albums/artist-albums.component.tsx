import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Album } from '@app/models/album.model';

import * as styles from './artist-albums.styles.scss';

type ArtistAlbumsComponentProps = {
    artistAlbums: Album[];
};
type Props = ArtistAlbumsComponentProps & RouteComponentProps;

export const ArtistAlbumsComponent = withRouter(
    ({ artistAlbums, history }: Props) => (
        <div className={styles['artist-albums']}>
            <h2>{artistAlbums[0]?.artists[0].name} other albums</h2>
            <div className={styles['album-list']}>
                {artistAlbums.map(album => (
                    <div
                        key={album.id}
                        className={styles['album-card']}
                        onClick={() => history.push(`/albums/${album.id}`)}
                    >
                        <img src={album.images[1]?.url}></img>
                        <div className={styles['album-name']}>
                            <span>{album.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
);
