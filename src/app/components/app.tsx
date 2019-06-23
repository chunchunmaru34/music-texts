import * as React from "react";

import * as styles from './app.scss';
import '../../assets/styles/global.scss';
import { TopTracksList } from '@components/top-tracks/top-tracks-list/top-tracks-list';

export const App = () => (
  <div className={styles.app}>
    <h1>Test application</h1>
    <TopTracksList></TopTracksList>
  </div>
)