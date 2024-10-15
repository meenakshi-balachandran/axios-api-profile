import { createContext, ReactNode, useReducer } from "react";
import ProfileReducer, { employeeAction } from "../reducer/ProfileReducer";


export interface State {
  profiles: any[];
  page:number,
  totalPages:number
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  page:1,
  totalPages:1,
  profiles: [],
  loading: false,
  error: null,
};

interface ApiContextType {
  state : State,
  dispatch : React.Dispatch<employeeAction>
}
const ApiContextData: ApiContextType = {
  state : initialState,
  dispatch : () => null
}

const ApiContext = createContext(ApiContextData);

export const ApiProvider: React.FC<{children: ReactNode}> = ({children}) =>  {
  const [state, dispatch] = useReducer(ProfileReducer, initialState);
  return (
    <ApiContext.Provider value={{state, dispatch}}>{children}</ApiContext.Provider>
  );
};

export default ApiContext;