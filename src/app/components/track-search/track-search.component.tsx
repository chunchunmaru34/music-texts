import * as React from 'react'

import { SearchBarComponent } from './search-bar/search-bar.component';
import { debounce } from '@app/utils';
import { searchTrack as searchTracks } from '@app/services/track/track.service';
import { Track } from '@app/interfaces/track.interface';

import * as styles from './track-search.styles.scss';
import { SearchResult } from './search-results/search-results.component';

export class TrackSearchComponent extends React.Component {
  state = { tracks: [] };

  search = debounce(async (value: string) => {
    if (!value) {
      this.setState({ tracks: []});
      return;
    }

    const tracks = await searchTracks(value);
    this.setState({ tracks });
  }, 300)

  render() {
    return (
      <div className={styles['track-search']}>
        <div className={styles.title}><h2>Search Tracks</h2></div>
        <SearchBarComponent onSearchInputChange={this.search}></SearchBarComponent>
        <SearchResult tracks={this.state.tracks}></SearchResult>
      </div>
    )
  }
}