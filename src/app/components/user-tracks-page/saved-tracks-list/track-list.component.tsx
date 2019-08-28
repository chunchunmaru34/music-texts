import * as React from 'react';

import * as styles from './track-list.styles.scss'

import { SavedTrack } from "@app/models/saved-track.model";
import { TrackLine } from '../track-line/track-line.component';
import { LoadingSpinner } from '@app/components/loading-spinner/loading-spinner';
import { Track } from '@app/models/track.model';

type SavedTracksListComponentProps = {
  savedTracks: SavedTrack[];
  selectedTrack: Track;
  isAdditionalTracksLoading: boolean;
  onSelectTrack(track: Track): void;
  onBoundaryReached(): void;
}

function createObserver(handler) {
  return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        handler();
      }
    })
  }, { rootMargin: '100px' });
}

export const SavedTracksListComponent = (props: SavedTracksListComponentProps) => {
  if (!props.savedTracks) {
    return <LoadingSpinner/>
  }

  let observer = React.useMemo(() => createObserver(props.onBoundaryReached), [props.onBoundaryReached]);
  const showMoreRef = React.useCallback(node => {
    if (node) {
      observer.observe(node);
    }
  }, []);

  return (
    <div className={styles['track-list']}>
      {props.savedTracks.map(savedTrack => (
        <TrackLine
          key={savedTrack.track.id}
          selected={!!props.selectedTrack && savedTrack.track.id === props.selectedTrack.id}
          track={savedTrack.track}
          onClick={() => props.onSelectTrack(savedTrack.track)}
        />
      ))}
      <div className={styles['show-more-container']}>
      {
        props.isAdditionalTracksLoading
        ? <LoadingSpinner/>
        : <div className={styles['show-more']} ref={showMoreRef}>Show more</div>
      }
      </div>
    </div>
  )
}