import { getTopTracks } from '@services/chart/chart-track.service';
import { Track } from '@app/models/track.model';

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
      const tracks = await getTopTracks(amount);
      dispatch(receiveTopTracks(tracks));
    } catch (error) {
      dispatch(failTopTracksRequest(error));
    }
  }
}