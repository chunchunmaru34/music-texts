import {
  TRACKS_SEARCH_FAILED,
  TRACKS_SEARCH_RECEIVED,
  TRACKS_SEARCH_REQUESTED,
  CLEAN_SEARCH_RESULTS
} from "@app/actions/search.actions";

const initialState = {
  tracks: []
}

export const searchTracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRACKS_SEARCH_RECEIVED:
      return {
        ...state,
        tracks: action.payload
      }

    case CLEAN_SEARCH_RESULTS:
      return {
        ...state,
        tracks: []
      }

    default:
      return state;
  }
}