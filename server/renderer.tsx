import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import React from 'react';
import { ChunkExtractor } from '@loadable/server'
import path from 'path';

import { requestToken, refreshToken } from './services';
import { App } from '../src/app/components/app';
import { SPOTIFY_REDIRECT_URL } from './constants';

export const renderer = new Router('/*');

const statsFile = path.resolve('./dist/public/loadable-stats.json');
const extractor = new ChunkExtractor({ statsFile });

renderer.get('/*', async (req, res) => {
  let { accessToken, refreshToken } = req.cookies;
  const { code } = req.query;

  if (!accessToken && !code) {
    res.writeHead(302, {
      Location: SPOTIFY_REDIRECT_URL
    });
    return res.end();
  }

  if (code && !accessToken) {
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
    accessToken,
    refreshToken
  }

  const app = extractor.collectChunks(
    <StaticRouter location={req.url} context={context}>
      <App initialState={initialState}/>
    </StaticRouter>
  )

  const body = renderToString(app);

  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();

  const html = getTemplate(body, {}, scriptTags, styleTags, linkTags);

  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    });
    return res.end();
  };

  res.send(html);
});

function getTemplate(body, initialState, scriptTags, styleTags, linkTags) {
  const stringifiedState = `${JSON.stringify(initialState)}`.replace(
    /</g,
    '\\u003c'
  );

  const html = `
    <html>
    <head>
      <title>SSR TEST</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${linkTags}
      ${styleTags}
      <script>window.__INITIAL_STATE__ = ${stringifiedState}</script>
    </head>
    <body>
    <div id="app">${body}</div>
    ${scriptTags}
    </body>
    </html>
  `;

  return html;
}
