import express from 'express';
import * as cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';

import { api } from './api';
import { renderer } from './renderer';

const expressApp = express();

expressApp.use(express.json());
expressApp.use(cookieParser());
expressApp.use(compression());


expressApp.use(api);

expressApp.use(express.static('./dist/public'))
   .use(cors());

expressApp.use(renderer);

expressApp.listen(8081, () => console.log('Listening on 8081'));