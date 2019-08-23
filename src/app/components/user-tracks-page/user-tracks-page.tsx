import * as React from 'react';

import { SavedTrack } from '@app/models/saved-track.model';
import * as libraryService from '@services/library/library.service';

import * as styles from './user-tracks-page.scss';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { TrackLine } from './track-line/track-line.component';
import { DisplayOnCondition } from '../display-on-condition/display-on-condition.component';
import { Track } from '@app/models/track.model';
import { TrackInfoComponent } from './track-info/track-info.component';

export const UserTracksPage = () => {
  const [savedTracks, setTracks] = React.useState<SavedTrack[]>();
  const [selectedTrack, setSelectedTrack] = React.useState<Track>();

  React.useEffect(() => {
    libraryService.getUserTracks().then(setTracks);
  }, []);

  return (
    <div className={styles['user-tracks-page']}>
      <div className={styles['track-list']}>
        {savedTracks
          ? savedTracks.map(savedTrack => (
              <TrackLine
                key={savedTrack.track.id}
                selected={!!selectedTrack && savedTrack.track.id === selectedTrack.id}
                track={savedTrack.track}
                onClick={() => setSelectedTrack(savedTrack.track)}
              />
            ))
          : <LoadingSpinner/>
        }
      </div>
      <DisplayOnCondition condition={!!selectedTrack}>
        <div className={styles['selected-track-container']}>
          <TrackInfoComponent track={selectedTrack}/>
        </div>
      </DisplayOnCondition>
    </div>
  )
}