import { combineReducers } from 'redux';

import { albumsReducer } from './allbums.reducer';
import { topTracksReducer } from './top-tracks.reducer';
import { searchTracksReducer } from './search-tracks.reducer';
import { authReducer } from './auth.reducer';

export const mainReducer = combineReducers({
  albums: albumsReducer,
  topTracks: topTracksReducer,
  searchTracks: searchTracksReducer,
  auth: authReducer
});