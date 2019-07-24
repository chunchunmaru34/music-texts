import * as React from 'react';

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { TopTracksList } from '@app/components/top-tracks/top-tracks-list/top-tracks-list.component';
import { TrackSearchComponent } from "./track-search/track-search.component";
import { authorize, redirectiToAuthPage } from '@app/services/authentication/authentication.service';

function getQueryStringValue (key) {
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

export const App = () => {
  React.useEffect(() => {
    const code = getQueryStringValue('code');
    if (code) {
      authorize(code);
    } else {
      redirectiToAuthPage();
    }
  }, []);

  return (

  <div className={styles.app}>
    <Header></Header>
    <div className={styles['track-search-container']}>
      <TrackSearchComponent></TrackSearchComponent>
    </div>
    <div className={styles['top-track-list-container']}>
      <TopTracksList></TopTracksList>
    </div>
  </div>
)}