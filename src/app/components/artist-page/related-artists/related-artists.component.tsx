import * as React from 'react';

import { Artist } from '@app/models/artist.model';

import * as styles from './related-artists.styles.scss';


export const RelatedAArtistsComponent = ({ relatedArtists }: { relatedArtists: Artist[] }) => (
  <div className={styles['related-artists']}>
    <h3>Related artists</h3>
    {relatedArtists.map(artist => artist.name)};
  </div>
)
