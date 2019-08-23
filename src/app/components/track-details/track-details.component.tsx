import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';


import { Track } from '@app/models/track.model';
import * as trackService from '@app/services/track/track.service';
import * as albumService from '@app/services/album/album.service';
import { Lyrics } from '@app/models/lyrics.model';
import { AlbumOtherTracksComponent } from './album-other-tracks/album-other-tracks.component';

import * as styles from './track-details.styles.scss';
import { LyricsComponent } from '../lyrics/lyrics.component';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';


export const TrackDetailsComponent = ({ match, location, history }: RouteComponentProps) => {
  const [track, setTrack]: [Track, any] = React.useState();
  const [lyrics, setLyrics]: [Lyrics, any] = React.useState();
  const [albumTracks, setAlbumTracks]: [Track[], any] = React.useState();

  if (!track && location.state) {
    setTrack(location.state);
  }

  React.useEffect(() => {
    if (!track) {
      trackService.getTracks([(match.params as Track).id]).then((tracks) => setTrack(tracks[0]));

      return;
    }

    trackService.searchLyrics(track.name, track.artists[0].name).then(setLyrics);

    if (!albumTracks) {
      albumService.getAlbumTracks(track.album.id)
        .then(tracks => trackService.getTracks(tracks.map(track => track.id)))
        .then(setAlbumTracks);
    }
  }, [track])

  const goToOtherDetails = React.useCallback((newTrack) => {
    if (newTrack === track) {
      return;
    }

    setLyrics();
    setTrack(newTrack);
    history.push(`/tracks/${newTrack.id}`, newTrack);
  }, [track]);

  if (!track) {
    return <LoadingSpinner/>;
  }

  return (
    <div className={styles['track-details-container']}>
      <div className={styles['album-details']}>
        <div className={styles['album-cover-container']}>
          <div className={styles['album-cover']}><img src={track.album.images[1].url}></img></div>
          <div className={styles['album-name']}>{track.album.name}</div>
        </div>
        <div className={styles['other-tracks']}>
          {albumTracks
            ? <AlbumOtherTracksComponent onClickAction={goToOtherDetails} tracks={albumTracks}/>
            : <LoadingSpinner/>
          }
        </div>
      </div>
      <div className={styles['track-details']}>
        <div className={styles['info-block']}>
          <div className={styles['track-name']}>{track.name}</div>
          <div className={styles['artist-name']}>
            {track.artists.map(artist => <div><Link to={`/artists/${artist.id}`}>{artist.name}</Link></div>)}
          </div>
        </div>
        <div className={styles['lyrics-container']}>
          { lyrics ? <LyricsComponent lyrics={lyrics}/> : <LoadingSpinner/>}
        </div>
      </div>
    </div>
  )
}