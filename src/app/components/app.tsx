import * as React from "react";

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { TopTracksList } from '@app/components/top-tracks/top-tracks-list/top-tracks-list.component';

export const App = () => (
  <div className={styles.app}>
    <Header></Header>
    <div className={styles['top-track-list-container']}>
      <TopTracksList></TopTracksList>
    </div>
  </div>
)