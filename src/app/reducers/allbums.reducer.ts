import { ALBUM_REQUESTED, ALBUM_RECEIVED, ALBUM_REQUEST_FAILED } from './../actions/album.actions';

const initialState = {
  albums: new Map()
}

export const albumsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALBUM_RECEIVED:
      const newAlbums = new Map(state.albums);
      newAlbums.set(action.payload.albumId, action.payload);
      return {
        ...state,
        albums: newAlbums
      }
    default:
      return state;
  }
}