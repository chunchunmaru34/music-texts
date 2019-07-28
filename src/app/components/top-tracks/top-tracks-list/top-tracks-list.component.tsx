import * as React from 'react';
import { connect } from 'react-redux';

import { TopTrack } from '../top-track/top-track.component';
import { fetchTopTracks } from '@actions/top-tracks.actions';
import { fetchAlbum } from '@actions/album.actions';

import * as styles from './top-tracks-list.styles.scss';
import { Track } from '@app/models/track.model';
import { Album } from '@app/models/album.model';

interface TopTracksProps {
  dispatch: Function,
  topTracks: Array<Track>,
  albums: Map<number, Album>
};

class TopTracksListComponent extends React.Component<TopTracksProps> {
  componentDidMount() {
    this.props.dispatch(fetchTopTracks(15));
  }

  render() {
    const { topTracks, albums } = this.props;

    return (
      <div className={styles['top-tracks-list']}>
        <div className={styles.title}><h2>Top Songs</h2></div>
        <div className={styles['top-track-cards']}>
          { topTracks.map((track: Track) => <TopTrack key={track.id} track={track}/>) }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topTracks: state.topTracks.tracks,
  albums: state.albums.albums
})

export const TopTracksList = connect(mapStateToProps, null)(TopTracksListComponent);