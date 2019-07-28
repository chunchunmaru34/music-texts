import * as React from 'react';

import { Track } from '@app/models/track.model';

import * as styles from './track-card.styles.scss';

type PropTypes = {
  track: Track,
}

export const TrackCard = ({ track }: PropTypes) => (
  <div className={styles['track-card']}>
    <img className={styles['album-cover']} src={track.album.images[1].url}></img>
    <div className={styles['track-name']}>{ track.name }</div>
  </div>
);
