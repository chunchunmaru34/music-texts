import { Track } from './../interfaces/track.interface';
import { getTopSongs } from '@services/chart/chart-track.service';

export const TOP_TRACKS_REQUESTED = 'TOP_TRACKS_REQUESTED';
export const TOP_TRACKS_RECEIVED = 'TOP_TRACKS_RECEIVED';
export const TOP_TRACKS_REQUEST_FAILED = 'TOP_TRACKS_REQUEST_FAILED';

export function requestTopTracks() {
  return {
    type: TOP_TRACKS_REQUESTED
  }
}

export function receiveTopTracks(tracks: Array<Track>) {
  return {
    type: TOP_TRACKS_RECEIVED,
    payload: tracks
  }
}

export function failTopTracksRequest(error) {
  return {
    type: TOP_TRACKS_REQUEST_FAILED,
    payload: error
  }
}

export function fetchTopTracks(amount: number) {
  return async (dispatch) => {
    dispatch(requestTopTracks());
    try {
      const tracks = await getTopSongs(amount);
      dispatch(receiveTopTracks(tracks));
    } catch (error) {
      dispatch(failTopTracksRequest(error));
    }
  }
}