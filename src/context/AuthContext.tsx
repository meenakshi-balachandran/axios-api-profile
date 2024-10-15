import { createContext, ReactNode, useReducer } from "react";
import AuthorisationReducer, { authAction } from "../reducer/AuthorisationReducer";

export interface initialAuthState {
  isAuthenticated: Boolean;
  accessToken: string,
  refreshToken: string
}

const AuthContextValue : initialAuthState =  {
  isAuthenticated: false,
  accessToken: "",
  refreshToken:""
}

export interface AuthProps {
  children: ReactNode;
}

interface AuthContextType {
  state : initialAuthState;
  dispatch : React.Dispatch<authAction>
}

const AuthData: AuthContextType = {
  state : AuthContextValue,
  dispatch : () => null
}

const AuthContext = createContext(AuthData);
export const AuthProvider = ({ children }: AuthProps) => {
  const [state, dispatch] = useReducer(AuthorisationReducer,AuthContextValue)

  return (
    <AuthContext.Provider value={{ state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
