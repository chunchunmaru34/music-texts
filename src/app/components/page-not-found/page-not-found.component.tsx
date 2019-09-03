import * as React from 'react';

import * as styles from './page-not-found.styles.scss'

const PageNotFoundComponent = () => (
  <div className={`content-container ${styles['page-not-found-container']}`}>
    <h1>404</h1>
    <h2>Page not found</h2>
  </div>
)

export default PageNotFoundComponent;