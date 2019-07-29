import * as React from 'react';

import { Album } from '@app/models/album.model';

import * as styles from './artist-albums.styles.scss';


export const ArtistAlbumsComponent = ({ artistAlbums }: { artistAlbums: Album[] }) => (
  <div className={styles['artist-albums']}>
    <h3>Artist albums</h3>
    {artistAlbums.map(album => (
      <div>
        <div>{album.name}</div>
        <div>{album.label}</div>
        <img src={album.images[1].url}></img>
      </div>
    ))}
  </div>
)
