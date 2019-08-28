import * as React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { FiHome, FiMusic } from 'react-icons/fi';

import * as styles from './navbar.styles.scss';


export const NavbarComponent = withRouter(({ history, location }: RouteComponentProps) => {
  return (
    <div className={styles['navbar']}>
      <Link className={styles['link']} to="/">
        <FiHome/>
        <span className={styles['link-label']}>Home</span>
      </Link>
      <Link className={styles['link']} to="/favourite-tracks">
        <FiMusic/>
        <span className={styles['link-label']}>Your Tracks</span>
      </Link>
    </div>
  )
})