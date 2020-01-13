import * as React from 'react';

import { Track } from '@app/models/track.model';

import * as styles from './track-card.styles.scss';

type PropTypes = {
    track: Track;
    onClick?(): void;
};

export const TrackCard = ({ track, onClick }: PropTypes) => (
    <div className={styles['track-card']} onClick={onClick}>
        <img
            className={styles['album-cover']}
            src={track.album.images[1]?.url}
        />
        <div className={styles['track-name']}>{track.name}</div>
    </div>
);
