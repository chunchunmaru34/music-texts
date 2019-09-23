import { ASYNC_ACTION_STARTED } from './../actions/auth.actions';
import { AUTHENTICATED, TOKEN_REFRESHED } from '@app/actions/auth.actions';

const initialState = {
  accessToken: '',
  refreshToken: '',
  shouldRedirectToAuthPage: false,
  asyncActions: []
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      }

    case TOKEN_REFRESHED:
      return {
        ...state,
        accessToken: action.payload
      }

    case ASYNC_ACTION_STARTED:
      return {
        ...state,
        asyncActions: [...state.asyncActions, action.payload]
      }

    default:
      return state;
  }
}