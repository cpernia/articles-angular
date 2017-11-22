import * as AuthActions from './auth.actions';

export interface AuthState {
  token: string;
  authenticated: boolean;
  error: string;
}

const initialState: AuthState = {
  token: null,
  authenticated: false,
  error: ''
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP):
    case (AuthActions.SIGNIN):
      return {
        ...state,
        authenticated: true,
        error: ''
      };
    case (AuthActions.SET_TOKEN):
      return {
        ...state,
        token: action.payload
      };
    case (AuthActions.ERROR):
      return {
        ...state,
        error: action.payload.error
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        token: null,
        authenticated: false,
        error: ''
      };
    default:
      return state;
  }
}
