import * as React from 'react';

import { Track } from '@app/models/track.model';
import { TrackCard } from '@app/components/track-card/track-card.component';

import * as styles from './artist-top-tracks.styles.scss';


export const ArtistTopTracksComponent = ({ artistTopTracks, onClickAction }: { artistTopTracks: Track[], onClickAction: Function }) => (
  <div className={styles['artist-top-tracks']}>
    <h3>Artist top tracks</h3>
    <div className={styles['track-list']}>
      {artistTopTracks.map(track => <TrackCard key={track.id} track={track} onClick={() => onClickAction(track)}></TrackCard>)}
    </div>
  </div>
)
