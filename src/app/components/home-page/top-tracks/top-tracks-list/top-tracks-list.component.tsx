import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as styles from './top-tracks-list.styles.scss';

import { TrackCard } from '@components/track-card/track-card.component';
import { trackService } from '@services/index';
import { Track } from '@app/models/track.model';
import { LoadingSpinner } from '@app/components/loading-spinner/loading-spinner';

const MAX_TOP_TRACKS = 25;

export const TopTracksListComponent = withRouter(({ history }: RouteComponentProps) => {
  const [topTracks, setTopTracks] = React.useState<Track[]>();

  React.useEffect(() => {
    trackService.getTopTracks(MAX_TOP_TRACKS).then(setTopTracks);
  }, []);

  if (!topTracks) {
    return <LoadingSpinner/>
  }

  const tracks = topTracks.map((track: Track) => (
    <TrackCard key={track.id} track={track} onClick={() => history.push(`/tracks/${track.id}`, track)}/>
  ));

  return (
    <div className={styles['top-tracks-list']}>
      <div className={styles.title}><h2>Top Songs</h2></div>
      <div className={styles['top-track-cards']}>
        {tracks}
      </div>
    </div>
  )
})