import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { redirectiToAuthPage } from '@app/services/authentication/authentication.service';
import { HomePageComponent } from './home-page/home-page.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { ArtistPage } from './artist-page/artist-page.component';

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
      <Switch>
        <Route path="/tracks/:id" component={TrackDetailsComponent}/>
        <Route path="/artists/:id" component={ArtistPage}/>
        <Route exact path="/" component={HomePageComponent}/>
      </Switch>
    </div>
)}