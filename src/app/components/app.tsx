import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { authorize } from '@app/services/authentication/authentication.service';
import { HomePageComponent } from './home-page/home-page.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { ArtistPage } from './artist-page/artist-page.component';


export const App = () => {
  React.useEffect(() => {
    authorize();
  }, []);

  if (!localStorage.getItem('access_token')) {
    return <div>No acess token</div>
  }

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