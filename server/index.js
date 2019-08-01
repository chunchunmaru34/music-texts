const express = require('express');
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config');
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackDevMiddleware = require('webpack-dev-middleware')
const path = require('path');

const compiler = webpack(webpackConfig);
const clientId = 'bb3e656da0034a318c9a3bb072e0d257';
const clientSecret = process.env.SPOTIFY_API_KEY;
const redirectUri = 'http://localhost:8081';
const apiUrl = 'https://accounts.spotify.com/api/token';
const authCode = new Buffer(`${clientId}:${clientSecret}`).toString('base64');

const app = express();

const hotMiddleware = webpackHotMiddleware(compiler);
const devMiddleware = webpackDevMiddleware(compiler, {
  hot: true,
  stats: {
    colors: true
  }
});

app.use(express.json());
app.use(devMiddleware);
app.use(hotMiddleware);
app.use(express.static('dist'))
   .use(cors())


app.get('/api/token/:code', async (req, res) => {
  try {
    const code = req.params.code;

    if (!code) {
      throw Error('No auth code provided');
    }

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

    return res.json({ accessToken, refreshToken, expiresInMs });
  } catch (error) {
    return res.status(500).json(error);
  }
});

app.post('/api/token/refresh', async (req, res) => {
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

// app.get(/^(?!\/api_).+/, (req, res) => res.sendFile(path.resolve(__dirname, '../dist/index.html')));

app.listen(8081, () => console.log('Listening on 8081'));