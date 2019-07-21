import {
  TOP_TRACKS_RECEIVED,
  TOP_TRACKS_REQUESTED,
  TOP_TRACKS_REQUEST_FAILED
} from "@actions/top-tracks.actions";
import { Track } from "@app/interfaces/track.interface";

const initialState = {
  tracks: []
}

export const topTracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_TRACKS_RECEIVED:
      const receivedTracks = action.payload;
      const resultedTracks = [...state.tracks];
      receivedTracks.forEach((track: Track) => {
        if (!resultedTracks.find(item => item.trackId === track.trackId)) {
          resultedTracks.push(track);
        }
      });
      return {
        ...state,
        tracks: resultedTracks
      }
    default:
      return state;
  }
}