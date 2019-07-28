import * as React from 'react';

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { TopTracksList } from '@app/components/top-tracks/top-tracks-list/top-tracks-list.component';
import { TrackSearchComponent } from "./track-search/track-search.component";
import { redirectiToAuthPage } from '@app/services/authentication/authentication.service';

function getQueryStringValue (key) {
  const toUri = '?' + window.location.hash.slice(1);
  return decodeURIComponent(toUri.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}

export const App = () => {
  React.useEffect(() => {
    const token = localStorage.getItem('access_token') || getQueryStringValue('access_token');
    if (token) {
      localStorage.setItem('access_token', token);
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