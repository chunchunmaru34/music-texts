import * as React from 'react';
import { connect } from 'react-redux';

import { Track } from '@interfaces/track.interface';
import { TopTrack } from '../top-track/top-track.component';
import { fetchTopTracks } from '@actions/top-tracks.actions';

import * as styles from './top-tracks-list.styles.scss';

interface TopTracksProps {
  dispatch: Function,
  topTracks: Array<Track>
};

class TopTracksListComponent extends React.Component<TopTracksProps> {
  async componentDidMount() {
    this.props.dispatch(fetchTopTracks(15));
  }

  render() {
    return (
      <div className={styles['top-tracks-list']}>
        <div className={styles.title}><h2>Top Songs</h2></div>
        <div className={styles['top-track-cards']}>
          { this.props.topTracks.map((track: Track) => <TopTrack key={track.trackId} track={track}/>) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topTracks: state.topTracks.tracks
})

export const TopTracksList = connect(mapStateToProps, null)(TopTracksListComponent);