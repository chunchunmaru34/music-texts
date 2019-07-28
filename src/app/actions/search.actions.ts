import * as trackService from '@services/track/track.service';
import { Track } from '@app/models/track.model';

export const TRACKS_SEARCH_REQUESTED = 'TRACKS_SEARCH_REQUESTED';
export const TRACKS_SEARCH_RECEIVED = 'TRACKS_SEARCH_RECEIVED';
export const TRACKS_SEARCH_FAILED = 'TOP_TRACKS_REQUEST_FAILED';
export const CLEAN_SEARCH_RESULTS = 'CLEAN_SEARCH_RESULTS';

export function tracksSearchRequested() {
  return {
    type: TRACKS_SEARCH_REQUESTED
  }
}

export function receiveTracksSearch(tracks: Array<Track>) {
  return {
    type: TRACKS_SEARCH_RECEIVED,
    payload: tracks
  }
}

export function failTracksSearch(error) {
  return {
    type: TRACKS_SEARCH_FAILED,
    payload: error
  }
}

export function searchTracks(query: string, options?) {
  return async (dispatch) => {
    dispatch(tracksSearchRequested());
    try {
      const tracks = await trackService.searchTracks(query, options);
      dispatch(receiveTracksSearch(tracks));
    } catch (error) {
      dispatch(failTracksSearch(error));
    }
  }
}

export function clearSearchResults() {
  return {
    type: CLEAN_SEARCH_RESULTS
  }
}