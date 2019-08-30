import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { getAccessTokenFromStorage } from '@app/services/authentication/authentication.service';
import { HomePageComponent } from './home-page/home-page.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { ArtistPage } from './artist-page/artist-page.component';
import { UserTracksPage } from './user-tracks-page/user-tracks-page';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AlbumPageComponent } from './album-page/album-page.component';

export const App = () => {
  if (!getAccessTokenFromStorage()) {
    return <div>No acess token</div>
  }

  return (
    <div className={styles.app}>
      <Header></Header>
      <Switch>
        <Route path="/tracks/:id" component={TrackDetailsComponent}/>
        <Route path="/artists/:id" component={ArtistPage}/>
        <Route path="/albums/:id" component={AlbumPageComponent}/>
        <Route path="/favourite-tracks" component={UserTracksPage}/>
        <Route exact path="/" component={HomePageComponent}/>
        <Route path="*" component={PageNotFoundComponent}/>
      </Switch>
    </div>
)}