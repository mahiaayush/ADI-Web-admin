import {
    GET_ACTIVE_ENTITIES_SUCCESS,
    GET_ACTIVE_ENTITIES_ERROR,
  } from "../constants";
  
  const initialState = {
    activeEntityListResponse: {
      data: [],
    }
  };
  
  const ActiveEntitiesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ACTIVE_ENTITIES_SUCCESS:
        return {
          ...state,
          activeEntityListResponse: {
            ...state.activeEntityListResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ACTIVE_ENTITIES_ERROR:
        return {
          ...state,
          activeEntityListResponse: {
            ...state.activeEntityListResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ActiveEntitiesReducer;