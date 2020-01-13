import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import * as styles from './track-details.styles.scss';

import { Track } from '@app/models/track.model';
import * as trackService from '@app/services/track/track.service';
import * as albumService from '@app/services/album/album.service';
import { LoadingWrapper } from '@components/loading-wrapper/loading-wrapper.component';
import { AlbumInfo } from './album-info/album-info.component';
import { TrackSimple } from '@app/models/track-simple.model';
import { TrackInfo } from './track-info/track-info.component';

type RouteParams = {
    id: string;
};

const TrackDetailsComponent = ({
    match,
    location,
    history
}: RouteComponentProps<RouteParams>) => {
    const [track, setTrack] = React.useState<Track | undefined>();
    const [albumTracks, setAlbumTracks] = React.useState<Track[]>();

    if (!track && location.state) {
        setTrack(location.state);
    }

    React.useEffect(() => {
        if (!track) {
            trackService.getTrack(match.params.id).then(setTrack);

            return;
        }

        if (!albumTracks) {
            albumService
                .getAlbumTracks(track.album.id)
                .then(tracks =>
                    trackService.getTracks(tracks.map(track => track.id))
                )
                .then(setAlbumTracks);
        }
    }, [track]);

    const goToOtherDetails = React.useCallback(
        (newTrack: Track | TrackSimple) => {
            if (newTrack.id === track.id) {
                return;
            }

            history.push(`/tracks/${newTrack.id}`, newTrack);
        },
        [track]
    );

    React.useEffect(() => setTrack(location.state), [location]);

    return (
        <LoadingWrapper isLoading={!track}>
            <div
                className={`content-container ${styles['track-details-container']}`}
            >
                <div className={styles['album-info-container']}>
                    <AlbumInfo
                        album={track?.album}
                        albumTracks={albumTracks}
                        goToOtherDetails={goToOtherDetails}
                    />
                </div>
                <div className={styles['track-info-container']}>
                    <TrackInfo track={track} />
                </div>
            </div>
        </LoadingWrapper>
    );
};

export default TrackDetailsComponent;
