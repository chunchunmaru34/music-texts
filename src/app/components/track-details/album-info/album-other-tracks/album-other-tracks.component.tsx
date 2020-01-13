import * as React from 'react';

import { Track } from '@app/models/track.model';

import * as styles from './album-other-tracks.styles.scss';

export const AlbumOtherTracksComponent = ({
    tracks,
    onClickAction
}: {
    tracks: Track[];
    onClickAction: (track: Track) => void;
}) => {
    const trackBlocks = tracks.map(track => (
        <div
            className={styles['track-block']}
            key={track.id}
            onClick={() => onClickAction(track)}
        >
            {track.name}
        </div>
    ));

    return (
        <div className={styles['tracks-container']}>
            <h3>Other tracks from this album</h3>
            <div className={styles['track-list']}>{trackBlocks}</div>
        </div>
    );
};
