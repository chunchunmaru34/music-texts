import * as React from 'react';

import { Track } from '@interfaces/track.interface';


type PropTypes = {
  track: Track
}

export const TopTrack = ({ track }: PropTypes) => (
  <div>
    <div>{ track.trackName }</div>
  </div>
);
