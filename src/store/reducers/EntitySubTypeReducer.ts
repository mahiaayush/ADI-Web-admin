import {
  GET_ENTITYSUBTYPE_SUCCESS,
  GET_ENTITYSUBTYPE_ERROR
  } from "../constants";

  const initialState = {
    entitySubTypeResponse: {
      data: {},
    }
  };
  
  const EntitySubTypeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ENTITYSUBTYPE_SUCCESS: 
        return {
          ...state,
          entitySubTypeResponse: {
            ...state.entitySubTypeResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_ENTITYSUBTYPE_ERROR:
        return {
          ...state,
          entitySubTypeResponse: {
            ...state.entitySubTypeResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default EntitySubTypeReducer;