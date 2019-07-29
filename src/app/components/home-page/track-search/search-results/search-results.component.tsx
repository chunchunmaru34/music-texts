import * as React from 'react';

import { TrackCard } from '@app/components/track-card/track-card.component';

import * as styles from './search-results.styles.scss';
import { Track } from '@app/models/track.model';

interface SearchResultComponentProps {
  tracks: Track[] | undefined,
  onResultsClicked: Function
}

export const SearchResult = ({ tracks, onResultsClicked }: SearchResultComponentProps) => {
  let tracksBlock;

  if (tracks) {
    tracksBlock = tracks.length
      ? tracks.map(track => <TrackCard key={track.id} track={track} onClick={() => onResultsClicked(track)}></TrackCard>)
      : <div className={styles['no-results-message']}>No results</div>
  }

  return (
    <div className={styles['search-results']}>
      { tracksBlock }
    </div>
  )
}