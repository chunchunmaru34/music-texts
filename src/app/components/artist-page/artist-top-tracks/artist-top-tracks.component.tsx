import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import * as styles from './artist-top-tracks.styles.scss';

import { TrackCard } from '@app/components/track-card/track-card.component';
import { Track } from '@app/models/track.model';

type ArtistTopTracksComponentProps = {
    artistTopTracks: Track[];
} & RouteComponentProps;

export const ArtistTopTracksComponent = withRouter(
    ({ artistTopTracks, history }: ArtistTopTracksComponentProps) => (
        <div className={styles['artist-top-tracks']}>
            <h3>Artist top tracks</h3>
            <div className={styles['track-list']}>
                {artistTopTracks.map(track => (
                    <TrackCard
                        key={track.id}
                        track={track}
                        onClick={() =>
                            history.push(`/tracks/${track.id}`, track)
                        }
                    />
                ))}
            </div>
        </div>
    )
);
