import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';


import { Track } from '@app/models/track.model';
import * as trackService from '@app/services/track/track.service';
import * as albumService from '@app/services/album/album.service';
import { Lyrics } from '@app/models/lyrics.model';
import { AlbumOtherTracksComponent } from './other-album-tracks/album-other-tracks.component';
import { TrackSimple } from '@app/models/track-simple.model';

import * as styles from './track-details.styles.scss';


export const TrackDetailsComponent = ({ location }: RouteComponentProps) => {
  const track = location.state as Track;

  const [lyrics, setLyrics]: [Lyrics, any] = React.useState();
  const [albumTracks, setAlbumTracks]: [TrackSimple[], any] = React.useState();

  React.useEffect(() => {
    trackService.searchLyrics(track.name, track.artists[0].name).then(setLyrics);
    albumService.getAlbumTracks(track.album.id).then(setAlbumTracks);
  }, []);

  const loading = <div>Loading</div>;

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
            {lyrics ? lyrics.lyricsBody : loading}
          </p>
        </div>
        <div className={styles['other-tracks']}>
          {albumTracks ? <AlbumOtherTracksComponent tracks={albumTracks}/> : loading}
        </div>
        <div className={styles['other-albums']}>
          <h3>Other albums from this artist</h3>
        </div>
      </div>
    </div>
  )
}