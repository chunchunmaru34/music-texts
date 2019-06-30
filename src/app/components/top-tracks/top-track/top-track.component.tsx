import * as React from 'react';

import { Track } from '@interfaces/track.interface';

import * as styles from './top-track.styles.scss';

type PropTypes = {
  track: Track
}

export const TopTrack = ({ track }: PropTypes) => (
  <div className={styles['track-card']}>
    <div className={styles['track-name']}>{ track.trackName }</div>
  </div>
);
