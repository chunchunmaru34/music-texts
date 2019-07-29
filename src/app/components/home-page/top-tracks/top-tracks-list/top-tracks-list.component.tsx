import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { TrackCard } from '@components/track-card/track-card.component';
import { fetchTopTracks } from '@actions/top-tracks.actions';

import * as styles from './top-tracks-list.styles.scss';
import { Track } from '@app/models/track.model';

interface TopTracksProps {
  dispatch: Function,
  topTracks: Array<Track>,
};

class TopTracksListComponent extends React.Component<TopTracksProps & RouteComponentProps> {
  componentDidMount() {
    this.props.dispatch(fetchTopTracks(15));
  }

  goToDetails = (track: Track) => {
    this.props.history.push(`/tracks/${track.id}`, track)
  }

  render() {
    const { topTracks } = this.props;

    return (
      <div className={styles['top-tracks-list']}>
        <div className={styles.title}><h2>Top Songs</h2></div>
        <div className={styles['top-track-cards']}>
          { topTracks.map((track: Track) => <TrackCard key={track.id} track={track} onClick={() => this.goToDetails(track)}/>) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topTracks: state.topTracks.tracks,
})

export const TopTracksList = withRouter(connect(mapStateToProps)(TopTracksListComponent));