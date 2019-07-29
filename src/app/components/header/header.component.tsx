import * as React from "react";

import { NavbarComponent } from "./navbar/navbar.component";

import * as styles from './header.styles.scss';

export const Header = () => (
  <div className={styles.header}>
    <div className={styles.title}>
      <h1>Tracks lyrics</h1>
    </div>
    <div><NavbarComponent></NavbarComponent></div>
  </div>
)