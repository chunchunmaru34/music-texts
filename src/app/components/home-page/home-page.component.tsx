import * as React from 'react';

import { TrackSearchComponent } from './track-search/track-search.component';
import { TopTracksList } from './top-tracks/top-tracks-list/top-tracks-list.component';

import * as styles from './home-page.styles.scss';

export const HomePageComponent = () => (
  <div>
    <div className={styles['track-search-container']}>
      <TrackSearchComponent></TrackSearchComponent>
    </div>
    <div className={styles['top-track-list-container']}>
      <TopTracksList></TopTracksList>
    </div>
  </div>
)