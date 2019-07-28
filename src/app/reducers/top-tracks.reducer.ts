import {
  TOP_TRACKS_RECEIVED,
  TOP_TRACKS_REQUESTED,
  TOP_TRACKS_REQUEST_FAILED
} from "@actions/top-tracks.actions";
import { Track } from "@app/models/track.model";

const initialState = {
  tracks: []
}

export const topTracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOP_TRACKS_RECEIVED:
      const receivedTracks = action.payload;
      const resultedTracks = [...state.tracks];
      receivedTracks.forEach((track: Track) => {
        if (!resultedTracks.find(item => item.id === track.id)) {
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