import { Router } from 'express';
import { requestToken, refreshToken } from './services';

export const api = new Router('/api');

api.get('/token/:code', async (req, res) => {
  try {
    const code = req.params.code;

    const result = await requestToken(code);

    return res.json(result);
  } catch (error) {
    return res.status(500).json(error);
  }
});

api.post('/token/refresh', async (req, res) => {
  const refreshTokenOld = req.body.refreshToken;

  try {
    const result = await refreshToken(refreshTokenOld);

    return res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});