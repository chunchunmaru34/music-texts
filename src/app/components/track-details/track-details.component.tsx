import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Track } from '@app/models/track.model';
import { searchLyrics } from '@app/services/track/track.service';
import { Lyrics } from '@app/models/lyrics.model';

import * as styles from './track-details.styles.scss';
import { Link } from 'react-router-dom';


export const TrackDetailsComponent = ({ history, location }: RouteComponentProps) => {
  const track = location.state as Track;

  const [lyrics, setLyrics] = React.useState(new Lyrics());
  React.useEffect(() => {
    async function getLyrics() {
      try {
        const lyrics = await searchLyrics(track.name, track.artists[0].name);
        setLyrics(lyrics);
        console.log(lyrics);
      } catch (error) {
        console.log(error);
      }
    }

    getLyrics();
  }, []);

  return (
    <div className={styles['track-details-container']}>
      <div className={styles['track-details']}>
        <div className={styles['header']}>
          <div className={styles['album-cover']}><img src={track.album.images[0].url}></img></div>
          <div className={styles['info-block']}>
            <div className={styles['track-name']}>{track.name}</div>
            <div className={styles['artist-name']}>{track.artists.map(artist => <Link to={`/artists/${artist.id}`}>{artist.name}</Link>)}</div>
          </div>
        </div>

        <div className={styles['lyrics']}>
          <span>Lyrics:</span>
          <p>
            {lyrics && lyrics.lyricsBody}
          </p>
        </div>
        <div>Other tracks from this album</div>
        <div>Other albums from this artist</div>
      </div>
    </div>
  )
}