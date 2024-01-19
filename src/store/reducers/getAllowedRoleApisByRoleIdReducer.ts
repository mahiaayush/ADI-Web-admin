import {
  GET_ROLE_ALLOWED_APIS_SUCCESS,
  GET_ROLE_ALLOWED_APIS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    allowedApisByRoleRes: {
      data: [],
    },
  };
  
  const getAllowedRoleApisByRoleIdReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ROLE_ALLOWED_APIS_SUCCESS:
        return {
          ...state,
          allowedApisByRoleRes: {
            ...state.allowedApisByRoleRes,
            data: action.payload,
            success: true,
          },
        };
      case GET_ROLE_ALLOWED_APIS_ERROR:
        return {
          ...state,
          allowedApisByRoleRes: {
            ...state.allowedApisByRoleRes,
            error: action.payload,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getAllowedRoleApisByRoleIdReducer;