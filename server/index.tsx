const express = require('express');
import * as cookieParser from 'cookie-parser';
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
import compression from 'compression';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { BrowserRouter, StaticRouter } from 'react-router-dom';

import { App } from '../src/app/components/app';
import { createReduxStore } from '../src/app/store';

const compiler = webpack(webpackConfig);
const clientId = 'bb3e656da0034a318c9a3bb072e0d257';
const clientSecret = process.env.SPOTIFY_API_KEY;
const redirectUri = 'http://localhost:8081';
const apiUrl = 'https://accounts.spotify.com/api/token';
const authCode = new Buffer(`${clientId}:${clientSecret}`).toString('base64');

const expressApp = express();

// const hotMiddleware = webpackHotMiddleware(compiler);
// const devMiddleware = webpackDevMiddleware(compiler, {
//   hot: true,
//   stats: {
//     colors: true
//   },
//   publicPath: webpackConfig.output.publicPath,
// });

expressApp.use(express.json());
expressApp.use(cookieParser());
expressApp.use(compression());

expressApp.get('/api/token/:code', async (req, res) => {
  try {
    const code = req.params.code;

    const result = await requestToken(code);

    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

expressApp.post('/api/token/refresh', async (req, res) => {
  const refreshTokenOld = req.body.refreshToken;

  try {
    const body = qs.stringify({
      'grant_type': 'refresh_token',
      'refresh_token': refreshTokenOld
    });
    const options = { headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authCode}`
    }};
    const response = await axios.post(`${apiUrl}`, body, options);

    const accessToken = response.data['access_token'];
    const expiresInMs = response.data['expires_in'] * 1000;

    res.json({ accessToken, expiresInMs });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// app.use(devMiddleware);
// app.use(hotMiddleware);
expressApp.use(express.static('dist'))
   .use(cors())


// app.get('/*', (req, res) => {
//   const filename = path.join(compiler.outputPath, 'index.html');

//   devMiddleware.waitUntilValid(() => {
//     compiler.outputFileSystem.readFile(filename, (err, result) =>{
//       if (err) {
//         return next(err);
//       }
//       res.set('content-type','text/html');
//       res.send(result);
//       res.end();
//     });
//   });
// });

expressApp.get('/*', async (req, res) => {
  let { accessToken, refreshToken } = req.cookies;
  const { code } = req.query;

  if (!accessToken && !code) {
    res.writeHead(302, {
      Location:  `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-read-email`
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
  const stringifiedState = `${JSON.stringify(store.getState())}`.replace(
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
  `

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    return res.end();
  };

  res.send(html);
})

expressApp.listen(8081, () => console.log('Listening on 8081'));

async function requestToken(code: string) {
  const body = qs.stringify({
    code,
    'grant_type': 'authorization_code',
    'redirect_uri': redirectUri
  });
  const options = { headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${authCode}`
  }};

  const response = await axios.post(apiUrl, body, options);

  const accessToken = response.data['access_token'];
  const refreshToken = response.data['refresh_token']
  const expiresInMs = response.data['expires_in'] * 1000;

  return { accessToken, refreshToken, expiresInMs };
}