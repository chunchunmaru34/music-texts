import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './album-info.styles.scss';

import { LoadingWrapper } from '@app/components/loading-wrapper/loading-wrapper.component';
import { AlbumOtherTracksComponent } from './album-other-tracks/album-other-tracks.component';
import { Track } from '@app/models/track.model';
import { TrackSimple } from '@app/models/track-simple.model';
import { AlbumSimple } from '@app/models/album-simple.model';

type AlbumInfoProps = {
    album: AlbumSimple;
    albumTracks: Track[];
    goToOtherDetails(track: Track | TrackSimple): void;
};

export const AlbumInfo = ({
    album,
    albumTracks,
    goToOtherDetails
}: AlbumInfoProps) => (
    <div className={styles['album-info']}>
        <div className={styles['album-cover-container']}>
            <div className={styles['album-cover']}>
                <img src={album.images[1]?.url}></img>
            </div>
            <div className={styles['album-name']}>
                <Link to={`/albums/${album.id}`}>{album.name}</Link>
            </div>
        </div>
        <div className={styles['other-tracks']}>
            <LoadingWrapper isLoading={!albumTracks}>
                <AlbumOtherTracksComponent
                    onClickAction={goToOtherDetails}
                    tracks={albumTracks}
                />
            </LoadingWrapper>
        </div>
    </div>
);
