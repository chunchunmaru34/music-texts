import * as React from 'react';

import { TopTrack } from '@app/components/top-tracks/top-track/top-track.component';

import * as styles from './search-results.styles.scss';


export const SearchResult = ({ tracks }) => {
  const trackCards = tracks.map(track => <TopTrack track={track} album={null}></TopTrack>)
  return (
    <div className={styles['search-results']}>
      {trackCards}
    </div>
  )
}