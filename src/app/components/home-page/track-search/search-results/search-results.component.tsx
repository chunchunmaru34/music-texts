import * as React from 'react';

import * as styles from './search-results.styles.scss';

import { TrackCard } from '@app/components/track-card/track-card.component';
import { Track } from '@app/models/track.model';

type SearchResultComponentProps = {
    tracks: Track[] | undefined;
    onResultsClicked(track: Track): void;
};

export const SearchResult = ({
    tracks,
    onResultsClicked
}: SearchResultComponentProps) => {
    let tracksBlock;

    if (tracks) {
        tracksBlock = tracks.length ? (
            tracks.map(track => (
                <TrackCard
                    key={track.id}
                    track={track}
                    onClick={() => onResultsClicked(track)}
                />
            ))
        ) : (
            <div className={styles['no-results-message']}>No results</div>
        );
    }

    return <div className={styles['search-results']}>{tracksBlock}</div>;
};
