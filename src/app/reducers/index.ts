import { combineReducers } from 'redux';

import { albumsReducer } from './allbums.reducer';
import { topTracksReducer } from './top-tracks.reducer';

export const mainReducer = combineReducers({
  albums: albumsReducer,
  topTracks: topTracksReducer
});