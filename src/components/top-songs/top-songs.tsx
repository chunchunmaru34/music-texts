import * as React from 'react';

import { getTopSongs } from '../../services/chart/chart-track.service';

export class TopSongs extends React.Component {
  async componentDidMount() {
    const songs: any = await getTopSongs();
  }

  render() {
    return <div>Top Songs</div>
  }
}
