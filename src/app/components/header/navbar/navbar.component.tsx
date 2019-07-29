import * as React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import * as styles from './navbar.styles.scss';


export const NavbarComponent = withRouter(({ history, location }: RouteComponentProps) => {
  return (
    <div className={styles['navbar']}>
      <Link className={styles['link']} to="/">Home</Link>
    </div>
  )
})