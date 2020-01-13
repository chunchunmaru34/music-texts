import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './track-info.styles.scss';

import { Track } from '@app/models/track.model';
import { Lyrics } from '@app/models/lyrics.model';
import { LoadingWrapper } from '@app/components/loading-wrapper/loading-wrapper.component';
import { LyricsComponent } from '@app/components/lyrics/lyrics.component';
import * as trackService from '@app/services/track/track.service';

type TrackInfoProps = {
    track: Track;
};

export const TrackInfo = ({ track }: TrackInfoProps) => {
    const [lyrics, setLyrics] = React.useState<Lyrics | undefined>();

    React.useEffect(() => {
        setLyrics(undefined);
        trackService
            .searchLyrics(track.name, track.artists[0].name)
            .then(setLyrics);
    }, [track]);

    const artistBlocks = track.artists.map(artist => (
        <div key={artist.id}>
            <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
        </div>
    ));

    return (
        <div className={styles['track-info']}>
            <div className={styles['info-block']}>
                <div className={styles['track-name']}>{track.name}</div>
                <div className={styles['artist-name']}>{artistBlocks}</div>
            </div>
            <div className={styles['lyrics-container']}>
                <LoadingWrapper isLoading={!lyrics}>
                    <LyricsComponent lyrics={lyrics} />
                </LoadingWrapper>
            </div>
        </div>
    );
};
