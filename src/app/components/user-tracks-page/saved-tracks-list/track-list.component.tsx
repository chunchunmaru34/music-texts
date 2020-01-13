import * as React from 'react';

import * as styles from './track-list.styles.scss';

import { SavedTrack } from '@app/models/saved-track.model';
import { TrackLine } from '../track-line/track-line.component';
import { LoadingSpinner } from '@app/components/loading-spinner/loading-spinner';
import { Track } from '@app/models/track.model';
import { LoadingWrapper } from '@app/components/loading-wrapper/loading-wrapper.component';
import { DisplayOnCondition } from '@app/components/display-on-condition/display-on-condition.component';

type SavedTracksListComponentProps = {
    savedTracks: SavedTrack[];
    selectedTrack: Track;
    isAdditionalTracksLoading: boolean;
    totalTracks: number;
    onSelectTrack(track: Track): void;
    onBoundaryReached(): void;
};

function createObserver(handler) {
    return new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    handler();
                }
            });
        },
        { rootMargin: '100px' }
    );
}

export const SavedTracksListComponent = (
    props: SavedTracksListComponentProps
) => {
    const {
        savedTracks,
        selectedTrack,
        isAdditionalTracksLoading,
        totalTracks,
        onBoundaryReached,
        onSelectTrack
    } = props;
    if (!savedTracks) {
        return <LoadingSpinner />;
    }

    const observer = React.useMemo(() => createObserver(onBoundaryReached), [
        onBoundaryReached
    ]);
    const showMoreRef = React.useCallback(node => {
        if (node) {
            observer.observe(node);
        }
    }, []);

    const showMore = (
        <div className={styles['show-more-container']}>
            <LoadingWrapper isLoading={isAdditionalTracksLoading}>
                <div className={styles['show-more']} ref={showMoreRef}>
                    Show more
                </div>
            </LoadingWrapper>
        </div>
    );

    return (
        <div className={styles['track-list']}>
            {savedTracks.map(savedTrack => (
                <TrackLine
                    key={savedTrack.track.id}
                    selected={
                        !!selectedTrack &&
                        savedTrack.track.id === selectedTrack.id
                    }
                    track={savedTrack.track}
                    onClick={() => onSelectTrack(savedTrack.track)}
                />
            ))}
            <DisplayOnCondition condition={savedTracks.length !== totalTracks}>
                {showMore}
            </DisplayOnCondition>
        </div>
    );
};
