import * as React from 'react';

import { TrackCard } from '@app/components/track-card/track-card.component';
import { Track } from '@app/models/track.model';

import * as styles from './album-other-tracks.styles.scss';


export const AlbumOtherTracksComponent = ({ tracks }: { tracks: Track[]}) => {
  const trackBlocks = tracks.map(track => <TrackCard key={track.id} track={track}></TrackCard>);

  return (
    <div>
       <h3>Other tracks from this album</h3>
        <div>{trackBlocks}</div>
    </div>
  )
};