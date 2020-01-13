import * as React from 'react';

import * as styles from './track-info.styles.scss';

import { Track } from '@app/models/track.model';
import * as trackService from '@app/services/track/track.service';
import { Lyrics } from '@app/models/lyrics.model';
import { LyricsComponent } from '@app/components/lyrics/lyrics.component';
import { LoadingWrapper } from '@app/components/loading-wrapper/loading-wrapper.component';
import { TrackOrigin } from './track-origin.component./track-origin.component';

export const TrackInfoComponent = ({ track }: { track: Track }) => {
    const [lyrics, setLyrics] = React.useState<Lyrics>();

    React.useEffect(() => {
        trackService
            .searchLyrics(track.name, track.artists[0].name)
            .then(setLyrics);
    }, [track]);

    return (
        <div className={styles['track-info']}>
            <div className={styles['info-block']}>
                <div className={styles['album-cover']}>
                    <img src={track.album.images[1].url}></img>
                </div>
                <TrackOrigin track={track} />
            </div>
            <div className={styles['lyrics-container']}>
                <LoadingWrapper isLoading={!lyrics}>
                    <LyricsComponent lyrics={lyrics} />
                </LoadingWrapper>
            </div>
        </div>
    );
};
