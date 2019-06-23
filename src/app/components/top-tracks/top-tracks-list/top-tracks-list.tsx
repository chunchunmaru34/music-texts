import * as React from 'react';

import { Track } from '@interfaces/track.interface';
import { TopTrack } from '../top-track/top-track';
import { getTopSongs } from '@services/chart/chart-track.service';


export class TopTracksList extends React.Component {
  state: any = { tracks: [] };

  async componentDidMount() {
    const tracks: any = await getTopSongs();

    this.setState({ tracks: tracks || []})
  }

  render() {
    return (
      <div>
        <div>Top Songs</div>
        <div>{ this.state.tracks.map((track: Track) => <TopTrack key={track.trackName} track={track}/>) }</div>
      </div>
    )
  }
}
