import {
    POST_ENTITY_USER_DETAILS_SUCCESS,
    POST_ENTITY_USER_DETAILS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    entityAssignedUserDetails: {
      data: {},
    }
  };
  
  const entityAssignedUserDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_ENTITY_USER_DETAILS_SUCCESS:
        return {
          ...state,
          entityAssignedUserDetails: {
            ...state.entityAssignedUserDetails,
            data: action.payload,
            success: true,
          },
          
        };
      case POST_ENTITY_USER_DETAILS_ERROR:
        return {
          ...state,
          entityAssignedUserDetails: {
            ...state.entityAssignedUserDetails,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityAssignedUserDetailsReducer;