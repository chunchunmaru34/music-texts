import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { App } from './app/components/app';
import { mainReducer } from './app/reducers/index';

(window as any).parseApiResponse = function(response: any) {
  return response;
}

const store = createStore(mainReducer, {}, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render((
    <Provider store={store}>
      <App/>
    </Provider>
  ),
 document.body
);