import { initialAuthState } from "../context/AuthContext";
import { AuthorisationType } from "../enum/AuthorisationType";

export interface authAction {
  type: AuthorisationType;
  payload?: any;
}

const AuthorisationReducer = (
  state: initialAuthState,
  action: authAction
): initialAuthState => {
  switch (action.type) {
    case AuthorisationType.SIGN_IN: {
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isAuthenticated: true,
      };
    }
    case AuthorisationType.SIGN_OUT: {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

export default AuthorisationReducer;
