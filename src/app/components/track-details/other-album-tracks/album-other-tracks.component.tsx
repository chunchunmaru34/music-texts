import * as React from 'react';

import { TrackCard } from '@app/components/track-card/track-card.component';
import { Track } from '@app/models/track.model';

import * as styles from './album-other-tracks.styles.scss';


export const AlbumOtherTracksComponent = ({ tracks, onClickAction }: { tracks: Track[], onClickAction: Function }) => {
  const trackBlocks = tracks.map(track => (
    <TrackCard key={track.id}
      track={track}
      onClick={ () => onClickAction(track) }
    />
  ));

  return (
    <div className={styles['tracks-container']}>
       <h3>Other tracks from this album</h3>
        <div>{trackBlocks}</div>
    </div>
  )
};