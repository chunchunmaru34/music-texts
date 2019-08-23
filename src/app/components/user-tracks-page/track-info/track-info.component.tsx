import * as React from 'react';
import { Link } from 'react-router-dom';

import * as styles from './track-info.styles.scss';

import { Track } from '@app/models/track.model';
import * as trackService from '@app/services/track/track.service';
import { Lyrics } from '@app/models/lyrics.model';
import { LoadingSpinner } from '@app/components/loading-spinner/loading-spinner';
import { LyricsComponent } from '@app/components/lyrics/lyrics.component';


export const TrackInfoComponent = ({ track }: { track: Track }) => {
  const [lyrics, setLyrics]: [Lyrics, any] = React.useState();

  React.useEffect(() => {
    trackService.searchLyrics(track.name, track.artists[0].name).then(setLyrics);
  }, [track])

  return (
    <div className={styles['track-info']}>
      <div className={styles['info-block']}>
        <div className={styles['album-cover']}><img src={track.album.images[1].url}></img></div>

        <div className={styles['track-origin']}>
          <div className={styles['track-name']}><h3>{track.name}</h3></div>

          <div className={styles['secondary-info']}>
            <div className={styles['album-name']}>
              <Link to={`/albuns/${track.album.id}`}>{track.album.name}</Link>
            </div>
            <div className={styles['artist-name']}>
              {track.artists.map(artist => <div><Link to={`/artists/${artist.id}`}>{artist.name}</Link></div>)}
            </div>
          </div>
        </div>

      </div>
      <div className={styles['lyrics-container']}>
        { lyrics ? <LyricsComponent lyrics={lyrics}/> : <LoadingSpinner/>}
      </div>
    </div>
  )
}