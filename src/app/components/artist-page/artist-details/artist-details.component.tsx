import * as React from 'react';

import { Artist } from '@app/models/artist.model';

import * as styles from './artist-details.styles.scss';


export const ArtistDetailsComponent = ({ artist }: { artist: Artist }) => (
  <div className={styles['artist-details']}>
    <div className={styles['info-block']}>
      <div className={styles['artist-name']}><h2>{artist.name}</h2></div>
      <div className={styles['artist-genres']}>
        <span>Genres: </span>
        {artist.genres.map(genre => <div className={styles['genre-block']} key={genre}>{genre}</div>)}
      </div>
    </div>
    <div className={styles['artist-image']}>
      {<img key={artist.images[0].url} src={artist.images[0] && artist.images[0].url}></img>}
    </div>
  </div>
)