var express = require('express');
var axios = require('axios');
var cors = require('cors');
var qs = require('qs');
var clientId = 'bb3e656da0034a318c9a3bb072e0d257';
var clientSecret = process.env.SPOTIFY_API_KEY;
var redirectUri = 'http://localhost:8081';
const apiUrl = 'https://accounts.spotify.com/api/token';

var app = express();

app.use(express.static('dist'))
   .use(cors())

app.get('/api/token/:code', async (req, res) => {
  try {
    const code = req.params.code;

    if (!code) {
      throw Error('No auth code provided');
    }

    const authCode = new Buffer(`${clientId}:${clientSecret}`).toString('base64');
    const body = qs.stringify({
      code,
      'grant_type': 'authorization_code',
      'redirect_uri': redirectUri
    });
    const params = { headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${authCode}`
    }};

    const response = await axios.post(apiUrl, body, params);

    const accessToken = response.data['access_token'];
    const refreshToken = response.data['refresh_token']
    const expiresInMs = response.data['expires_in'] * 1000;

    return res.json({ accessToken, refreshToken, expiresInMs });
  } catch (error) {
    return res.status(500).json(error);
  }
});

console.log('Listening on 8081');
app.listen(8081);