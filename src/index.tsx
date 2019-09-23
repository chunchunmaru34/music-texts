import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component'

import { App } from './app/components/app';

const app = (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
)

loadableReady(() => ReactDOM.hydrate(app, document.getElementById('app')));