export const AUTHENTICATED = 'AUTHENTICATED';
export const TOKEN_REFRESHED = 'TOKEN_REFRESHED';
export const REDIRECT_TO_AUTH = 'REDIRECT_TO_AUTH';
export const ASYNC_ACTION_STARTED = 'ASYNC_ACTION_STARTED';

export function authenticated(tokens: { accessToken: string, refreshToken: string }) {
  return {
    type: AUTHENTICATED,
    payload: tokens
  }
}

export function tokenRefreshed(refreshToken: string) {
  return {
    type: TOKEN_REFRESHED,
    payload: refreshToken
  }
}

export function asyncActionStarted(action: Promise<any>) {
  return {
    type: ASYNC_ACTION_STARTED,
    payload: action
  }
}