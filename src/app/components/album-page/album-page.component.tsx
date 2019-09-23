import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import * as styles from './album-page.styles.scss';

import * as albumService from '@services/album/album.service';
import { Album } from '@models/album.model';
import { LoadingSpinner } from '../loading-spinner/loading-spinner';
import { Link } from 'react-router-dom';
import { ArtistAlbumsContainer } from '../artist-albums/artist-albums.container';

const AlbumPageComponent = ({ match }: RouteComponentProps) => {
  const albumId = (match.params as any).id;

  const [album, setAlbum] = React.useState<Album>();

  React.useEffect(() => {
    albumService.getAlbum(albumId).then(setAlbum);
  }, [match]);

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
          <div className={styles['album-']}>
            {album.artists.map(artist => (
              <div className={styles['artist']}>
                <Link to={`/artists/${artist.id}`}>{artist.name}</Link>
              </div>
            ))}
          </div>
          <div>{album.label}</div>
          <div>{album.genres.map(genre => <div>{genre}</div>)}</div>
          <div>Released {album.releaseDate}</div>
          <div className={styles['track-list-container']}>
            <h2>Album tracks</h2>
            <div className={styles['track-list']}>
              {album.tracks.map(track => (
                  <div key={track.id}>
                    <Link to={`/tracks/${track.id}`}>{track.name}</Link>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className={styles['artist-albums-container']}>
        {album.artists.map(artist => <ArtistAlbumsContainer artistId={artist.id}/>)}
      </div>
    </div>
  )
}

export default AlbumPageComponent;