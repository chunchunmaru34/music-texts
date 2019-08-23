import * as React from 'react';
import { ClipLoader } from 'react-spinners';

import * as styles from './loading-spinner.scss';


export const LoadingSpinner = () => (
  <div className={styles['sweet-loading']}>
    <ClipLoader
      sizeUnit={"px"}
      size={75}
      color={'#b7bccb'}
    />
  </div>
)