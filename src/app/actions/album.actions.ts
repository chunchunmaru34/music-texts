import { getAlbum } from '@services/album/album.service';
import { Album } from '@app/models/album.model';

export const ALBUM_REQUESTED = 'ALBUM_REQUESTED';
export const ALBUM_RECEIVED = 'ALBUM_RECEIVED';
export const ALBUM_REQUEST_FAILED = 'ALBUM_REQUEST_FAILED';

export function requestAlbum() {
  return {
    type: ALBUM_REQUESTED
  }
}

export function receiveAlbum(album: Album) {
  return {
    type: ALBUM_RECEIVED,
    payload: album
  }
}

export function failAlbumRequest(error) {
  return {
    type: ALBUM_REQUEST_FAILED,
    payload: error
  }
}

export function fetchAlbum(albumId: number) {
  return async (dispatch) => {
    dispatch(requestAlbum());
    try {
      const tracks = await getAlbum(albumId);
      dispatch(receiveAlbum(tracks));
    } catch (error) {
      dispatch(failAlbumRequest(error));
    }
  }
}