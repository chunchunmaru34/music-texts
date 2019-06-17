import * as React from 'react';
import { Track } from '../../interfaces/track.interface';
import { getTopSongs } from '../../services/chart/chart-track.service';

export class TopSongs extends React.Component {
  state: any = { tracks: [] };

  async componentDidMount() {
    const tracks: any = await getTopSongs();

    this.setState({ tracks: tracks || []})
  }

  render() {
    return (
      <div>
        <div>Top Songs</div>
        <div>{ this.state.tracks.map((song: Track) => <div>{song.trackName}</div>) }</div>
      </div>
    )
  }
}
