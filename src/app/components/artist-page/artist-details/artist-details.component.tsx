import * as React from 'react';

import { Artist } from '@app/models/artist.model';

import * as styles from './artist-details.styles.scss';


export const ArtistDetailsComponent = ({ artist }: { artist: Artist }) => (
  <div className={styles['artist-details']}>
    <div>{artist.name}</div>
    <div>{artist.genres.map(genre => <span key={genre}>{genre}</span>)}</div>
    <div>{artist.images.map(image => <img key={image.url} src={image.url}></img>)}</div>
  </div>
)