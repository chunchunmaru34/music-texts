import * as React from 'react';

import { TrackCard } from '@app/components/track-card/track-card.component';

import * as styles from './search-results.styles.scss';


export const SearchResult = ({ tracks }) => {
  const trackCards = tracks.map(track => <TrackCard track={track}></TrackCard>)
  return (
    <div className={styles['search-results']}>
      {trackCards}
    </div>
  )
}