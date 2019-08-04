import * as React from 'react';

import { Album } from '@app/models/album.model';

import * as styles from './artist-albums.styles.scss';


export const ArtistAlbumsComponent = ({ artistAlbums }: { artistAlbums: Album[] }) => (
  <div className={styles['artist-albums']}>
    <h3>Artist albums</h3>
    <div className={styles['album-list']}>
      {artistAlbums.map(album => (
        <div className={styles['album-card']}>
          <img src={album.images[1].url}></img>
          <div className={styles['album-name']}>{album.name}</div>
        </div>
      ))}
    </div>
  </div>
)
