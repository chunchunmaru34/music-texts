import * as React from 'react';
import { connect } from 'react-redux';

import { Track } from '@interfaces/track.interface';
import { TopTrack } from '../top-track/top-track.component';
import { fetchTopTracks } from '@actions/top-tracks.actions';
import { fetchAlbum } from '@actions/album.actions';

import * as styles from './top-tracks-list.styles.scss';
import { Album } from '@app/interfaces/album.interface';

interface TopTracksProps {
  dispatch: Function,
  topTracks: Array<Track>,
  albums: Map<number, Album>
};

class TopTracksListComponent extends React.Component<TopTracksProps> {
  componentDidMount() {
    this.props.dispatch(fetchTopTracks(15));
  }

  componentDidUpdate(prevProps) {
    const newTracks = this.props.topTracks.filter(track => !prevProps.topTracks.find(item => item.trackId === track.trackId));
    newTracks.forEach(track => this.props.dispatch(fetchAlbum(track.albumId)));
  }

  render() {
    const { topTracks, albums } = this.props;

    return (
      <div className={styles['top-tracks-list']}>
        <div className={styles.title}><h2>Top Songs</h2></div>
        <div className={styles['top-track-cards']}>
          { topTracks.map((track: Track) => <TopTrack key={track.trackId} track={track} album={albums.get(track.albumId)}/>) }
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