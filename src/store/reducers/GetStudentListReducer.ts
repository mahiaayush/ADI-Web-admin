import {
    GET_ENTITY_USER_DETAILS_ERROR,
    GET_ENTITY_USER_DETAILS_SUCCESS,
  } from "../constants";
  
  const initialState = {
    entityUserDetailsResponse: {
      data: {},
    }
  };
  
  const entityUserDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ENTITY_USER_DETAILS_SUCCESS:
        return {
          ...state,
          entityUserDetailsResponse: {
            ...state.entityUserDetailsResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ENTITY_USER_DETAILS_ERROR:
        return {
          ...state,
          entityUserDetailsResponse: {
            ...state.entityUserDetailsResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityUserDetailsReducer;