import * as React from 'react';

import { Artist } from '@app/models/artist.model';

import * as styles from './related-artists.styles.scss';


export const RelatedArtistsComponent = ({ relatedArtists, onClickAction }: { relatedArtists: Artist[], onClickAction: Function }) => (
  <div className={styles['related-artists']}>
    <h3>Related artists</h3>
    <div className={styles['artist-list']}>
      {relatedArtists.map(artist => (
        <div className={styles['artist-item']} onClick={() => onClickAction(artist)}>
          <div className={styles['image-container']}>
            <img src={artist.images[artist.images.length - 1].url}></img>
          </div>
          <span>{artist.name}</span>
        </div>
      ))}
    </div>
  </div>
)
