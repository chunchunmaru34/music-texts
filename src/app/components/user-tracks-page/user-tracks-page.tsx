import * as React from 'react';
import * as cs from 'classnames';

import * as styles from './user-tracks-page.scss';

import { DisplayOnCondition } from '../display-on-condition/display-on-condition.component';
import { Track } from '@app/models/track.model';
import { TrackInfoComponent } from './track-info/track-info.component';
import { SavedTracksListContainer } from './saved-tracks-list/track-list.container';

export const UserTracksPage = () => {
  const [selectedTrack, selectTrack] = React.useState<Track>();

  return (
    <div className={cs('content-container', styles['user-tracks-page'])}>
      <div className={styles['track-list-container']}>
        <SavedTracksListContainer
          selectedTrack={selectedTrack}
          onTrackSelected={selectTrack}
          />
      </div>
      <DisplayOnCondition condition={!!selectedTrack}>
        <div className={styles['selected-track-info-container']}>
          <TrackInfoComponent track={selectedTrack}/>
        </div>
      </DisplayOnCondition>
    </div>
  )
}