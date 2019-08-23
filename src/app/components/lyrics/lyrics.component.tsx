import * as React from 'react';

import { Lyrics } from '@app/models/lyrics.model';

import * as styles from './lyrics.styles.scss';


export const LyricsComponent = ({ lyrics }: { lyrics: Lyrics }) => (
  <div className={styles['lyrics']}>
    <h3>Lyrics</h3>
    <p>
      {lyrics.lyricsBody}
    </p>
    <div>{lyrics.lyricsCopyright}</div>
  </div>
)