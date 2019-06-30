import * as React from 'react';

import { Track } from '@interfaces/track.interface';
import { TopTrack } from '../top-track/top-track.component';
import { getTopSongs } from '@services/chart/chart-track.service';

import * as styles from './top-tracks-list.styles.scss';

export class TopTracksList extends React.Component {
  state: any = { tracks: [] };

  async componentDidMount() {
    const tracks: any = await getTopSongs();

    this.setState({ tracks: tracks || []})
  }

  render() {
    return (
      <div className={styles['top-tracks-list']}>
        <div className={styles.title}><h2>Top Songs</h2></div>
        <div className={styles['top-track-cards']}>
          { this.state.tracks.map((track: Track) => <TopTrack key={track.trackId} track={track}/>) }
        </div>
      </div>
    )
  }
}
