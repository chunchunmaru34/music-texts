import * as React from 'react'
// import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchResult } from './search-results/search-results.component';
import { debounce } from '@app/utils';
import { Track } from '@app/models/track.model';
import { trackService } from '@services/index';

import * as styles from './track-search.styles.scss';

export const TrackSearchComponent = withRouter(({ history }: RouteComponentProps) => {
  const [tracks, setTracks] = React.useState<Track[] | undefined>();

  const search = React.useCallback(
    debounce((value: string) => {
      if (!value) {
        setTracks(undefined);

        return;
      }

      trackService.searchTracks(value, { limit: 10 }).then(setTracks);
    }, 300),
    []
  );

  const goToDetails = React.useCallback((track: Track) => {
    history.push(`/tracks/${track.id}`, track);
  }, []);

  return (
    <div className={styles['track-search']}>
      <div className={styles.title}>
        <h2>Search Tracks</h2>
      </div>
      <SearchBarComponent onSearchInputChange={search}/>
      <div className={styles['search-result-container']}>
        <SearchResult
          tracks={tracks}
          onResultsClicked={goToDetails}
        />
      </div>
    </div>
  )
});
