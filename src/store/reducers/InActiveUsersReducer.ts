import {
    GET_INACTIVE_USERS_SUCCESS,
    GET_INACTIVE_USERS_ERROR,
  } from "../constants";
  
  const initialState = {
    inactiveUsersResponse: {
      data: {},
    }
  };
  
  const InActiveUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INACTIVE_USERS_SUCCESS:
        return {
          ...state,
          inactiveUsersResponse: {
            ...state.inactiveUsersResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_INACTIVE_USERS_ERROR:
        return {
          ...state,
          inactiveUsersResponse: {
            ...state.inactiveUsersResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default InActiveUsersReducer;