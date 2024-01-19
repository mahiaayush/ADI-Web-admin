import {
    GET_ACTIVE_USERS_SUCCESS,
    GET_ACTIVE_USERS_ERROR,
    GET_PREMIUM_COUNT_SUCCESS,
    GET_PREMIUM_COUNT_ERROR
  } from "../constants";
  
  const initialState = {
    activeUsersResponse: {
      data: {},
    },
    premiumUsersResponse: {
      data: [],
    }
  };
  
  const ActiveUsersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ACTIVE_USERS_SUCCESS:
        return {
          ...state,
          activeUsersResponse: {
            ...state.activeUsersResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ACTIVE_USERS_ERROR:
        return {
          ...state,
          activeUsersResponse: {
            ...state.activeUsersResponse,
            data: action.payload,
            success: false,
          },
        };
      case GET_PREMIUM_COUNT_SUCCESS:
        return {
          ...state,
          premiumUsersResponse: {
            ...state.premiumUsersResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_PREMIUM_COUNT_ERROR:
        return {
          ...state,
          premiumUsersResponse: {
            ...state.premiumUsersResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ActiveUsersReducer;