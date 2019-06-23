import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './app/components/app';

(window as any).parseApiResponse = function(response: any) {
  return response;
}

ReactDOM.render(<App/>, document.body);