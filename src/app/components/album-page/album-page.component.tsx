import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import * as styles from './album-page.styles.scss';

import * as albumService from '@services/album/album.service';
import { Album } from '@models/album.model';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { TrackCard } from '../track-card/track-card.component';

const AlbumPageComponent = ({ match, history }: RouteComponentProps) => {
  const albumId = (match.params as any).id;

  const [album, setAlbum] = React.useState<Album>();

  React.useEffect(() => {
    albumService.getAlbum(albumId).then(setAlbum);
  }, []);

  if (!album) {
    return (
      <div className={`content-container ${styles['album-page-container']}`}>
        <LoadingSpinner/>
      </div>
    )
  }

  return (
    <div className={`content-container ${styles['album-page-container']}`}>
      <div className={styles['album-info']}>
        <div className={styles['album-cover-container']}>
          <img src={album.images[0] && album.images[0].url}></img>
        </div>
        <div className={styles['album-details']}>
          <h1>{album.name}</h1>
          <div>{album.label}</div>
          <div>{album.genres.map(genre => <div>{genre}</div>)}</div>
          <div>Released {album.releaseDate}</div>
          <div className={styles['track-list-container']}>
            <h2>Album tracks</h2>
            <div className={styles['track-list']}>
              {album.tracks.map(track => <div key={track.id} onClick={() => history.push(`/tracks/${track.id}`)}>{track.name}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlbumPageComponent;