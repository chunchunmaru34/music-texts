import * as React from 'react';

import { Track } from '@interfaces/track.interface';
import { Album } from '@app/interfaces/album.interface';

import * as styles from './top-track.styles.scss';

type PropTypes = {
  track: Track,
  album: Album
}

export const TopTrack = ({ track, album }: PropTypes) => (
  <div className={styles['track-card']}>
    <img src={album && album.coverartUrl}></img>
    <div className={styles['track-name']}>{ track.trackName }</div>
  </div>
);
