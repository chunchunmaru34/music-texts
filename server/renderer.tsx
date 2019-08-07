import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';
import React from 'react';

import { requestToken, refreshToken } from './services';
import { App } from '../src/app/components/app';
import { createReduxStore } from '../src/app/store';
import { CLIENT_ID, REDIRECT_URI } from './constants';


export const renderer = new Router('/*');

renderer.get('/*', async (req, res) => {
  let { accessToken, refreshToken } = req.cookies;
  const { code } = req.query;

  if (!accessToken && !code) {
    res.writeHead(302, {
      Location:  `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=user-read-email`
    });
    return res.end();
  }

  if (code) {
    try {
      const result = await requestToken(code);
      accessToken = result.accessToken;
      refreshToken = result.refreshToken;
      res.cookie('accessToken', accessToken, { maxAge: 900000 });
      res.cookie('refreshToken', refreshToken, { maxAge: 900000 });
    } catch (err) {
      return res.status(500).json(err);
    }

  }

  const context: any = {};
  const initialState = {
    auth: {
      accessToken,
      refreshToken
    }
  }
  const store = createReduxStore(initialState);

  const app = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    </Provider>
  )

  const body = renderToString(app);
  const asyncActions = store.getState().auth.asyncActions;
  if (asyncActions) {
    await Promise.all(asyncActions);
  }

  const html = getTemplate(body, store.getState());

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    return res.end();
  };

  res.send(html);
});

function getTemplate(body, initialState) {
  const stringifiedState = `${JSON.stringify(initialState)}`.replace(
    /</g,
    '\\u003c'
  );

  const html = `
    <html>
    <head>
      <title>SSR TEST</title>
      <link rel="preload" href="/public/main.css" as="style" />
      <link href="/public/main.css" rel="stylesheet"></head>
      <script>window.__INITIAL_STATE__ = ${stringifiedState}</script>
    </head>
    <body>
    <div id="app">${body}</div>
    <script src="/public/main.js" charset="utf-8"></script>
    </body>
    </html>
  `;

  return html;
}