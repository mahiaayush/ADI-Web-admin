import {
    GET_ALL_ENTITIES_SUCCESS,
    GET_ALL_ENTITIES_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    getAllEntityResponse: {
      data: {},
    },
  };
  
  const getAllEntityReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_ENTITIES_SUCCESS:
        return {
          ...state,
          getAllEntityResponse: {
            ...state.getAllEntityResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ALL_ENTITIES_ERROR:
        return {
          ...state,
          getAllEntityResponse: {
            ...state.getAllEntityResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getAllEntityReducer;