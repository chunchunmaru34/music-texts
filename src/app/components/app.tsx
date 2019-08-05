import * as React from 'react';
import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as styles from './app.scss';
import '../../assets/styles/global.scss';

import { Header } from './header/header.component';
import { getToken, getRedirectUrl, getAccessTokenFromStorage } from '@app/services/authentication/authentication.service';
import { HomePageComponent } from './home-page/home-page.component';
import { TrackDetailsComponent } from './track-details/track-details.component';
import { ArtistPage } from './artist-page/artist-page.component';
import { getQueryStringValue} from '@utils/index';
import { asyncActionStarted } from '@app/actions/auth.actions';


export const App = withRouter(({ location, history }: RouteComponentProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {


  }, []);

  // async function authorize() {
  //   const token = getAccessTokenFromStorage();
  //   const code = getQueryStringValue(location.search, 'code');

  //   if (token) {
  //     return;
  //   }
  // }
  // asyncActionStarted(authorize());

  if (!getAccessTokenFromStorage()) {
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
)})