import * as React from 'react';
import { TopTrack } from '@app/components/top-tracks/top-track/top-track.component';

export const SearchResult = ({ tracks }) => {
  const trackCards = tracks.map(track => <TopTrack track={track} album={null}></TopTrack>)
  return (
    <div>
      {trackCards}
    </div>
  )
}