import * as React from 'react';

import { Track } from '@app/models/track.model';

import * as styles from './top-track.styles.scss';

type PropTypes = {
  track: Track,
}

export const TopTrack = ({ track }: PropTypes) => (
  <div className={styles['track-card']}>
    <img src={''}></img>
    <div className={styles['track-name']}>{ track.name }</div>
  </div>
);
