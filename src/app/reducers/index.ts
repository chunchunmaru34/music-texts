import { combineReducers } from 'redux';

import { albumsReducer } from './allbums.reducer';

export const mainReducer = combineReducers({
  albums: albumsReducer
});