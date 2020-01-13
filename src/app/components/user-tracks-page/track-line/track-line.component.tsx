import * as React from 'react';
import * as cs from 'classnames';

import * as styles from './track-line.styles.scss';

import { Track } from '@app/models/track.model';
import { Link } from 'react-router-dom';

type TrackLineProps = {
    track: Track;
    selected: boolean;
    onClick(): void;
};

export const TrackLine = ({ track, onClick, selected }: TrackLineProps) => {
    return (
        <div
            className={cs(styles['track-line'], {
                [styles['selected']]: selected
            })}
            onClick={onClick}
        >
            <div className={styles['album-cover']}>
                <img src={track.album.images[2]?.url}></img>
            </div>
            <div className={styles['track-info']}>
                <div className={styles['track-name']}>{track.name}</div>
                <div className={styles['track-origin']}>
                    <div className={styles['artists']}>
                        {track.artists.map(artist => (
                            <Link key={artist.id} to={`artists/${artist.id}`}>
                                {artist.name}
                            </Link>
                        ))}
                    </div>
                    <span className={styles['separator']}>•</span>
                    <div className={styles['album-name']}>
                        <Link to={`/albums/${track.album.id}`}>
                            {track.album.name}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
