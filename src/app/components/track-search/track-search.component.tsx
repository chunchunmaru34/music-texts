import * as React from 'react'
import { connect } from 'react-redux';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResult } from './search-results/search-results.component';
import { debounce } from '@app/utils';
import { Track } from '@app/models/track.model';
import { clearSearchResults, searchTracks } from '@actions/search.actions';

import * as styles from './track-search.styles.scss';

interface TrackSearchProps {
  tracks: Track[],
  cleanResults: Function,
  searchTracks: Function,
  dispatch: Function,
}

class TrackSearch extends React.Component<TrackSearchProps> {
  search = debounce((value: string) => {
    const { searchTracks, cleanResults } = this.props;
    if (!value) {
      cleanResults();
      return;
    }

    searchTracks(value, { limit: 10 });
  }, 300)

  render() {
    return (
      <div className={styles['track-search']}>
        <div className={styles.title}><h2>Search Tracks</h2></div>
        <SearchBarComponent onSearchInputChange={this.search}></SearchBarComponent>
        <div className={styles['search-result-container']}>
          <SearchResult tracks={this.props.tracks}></SearchResult>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tracks: state.searchTracks.tracks
});

const mapDispatchToProps = (dispatch) => ({
  cleanResults: () => dispatch(clearSearchResults()),
  searchTracks: (query, options?) => dispatch(searchTracks(query, options))
})

export const TrackSearchComponent = connect(mapStateToProps, mapDispatchToProps)(TrackSearch);