import { State } from "../context/ApiContext";
import { ApiType } from "../type/ApiType";

export interface employeeAction {
  type: ApiType;
  payload?: any;
}

const ProfileReducer = (state: State, action: employeeAction): State => {
  switch (action.type) {
    case ApiType.EMPLOYEE_PROFILE_SUCCESS: {
      console.log("Profiles set in state:", action.payload);
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    }

    case ApiType.EMPLOYEE_PROFILE_ERROR: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    }
    case ApiType.FETCH_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case ApiType.TOTAL_PAGE: {
      return {
        ...state,
        totalPages: action.payload,
      };
    }
  }
};

export default ProfileReducer;
