import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { App } from './app/components/app';
import { createReduxStore } from './app/store';

const store = createReduxStore((window as any).__INITIAL_STATE__);
delete (window as any).__INITIAL_STATE__;

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
)

ReactDOM.hydrate(app, document.getElementById('app'));