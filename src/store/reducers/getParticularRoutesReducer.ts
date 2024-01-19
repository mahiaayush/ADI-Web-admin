import {
    GET_PARTICULAR_ROUTES_SUCCESS,
    GET_PARTICULAR_ROUTES_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    getParticularRoutes: {
      data: [],
    },
  };
  
  const getAllPossibleRoutesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PARTICULAR_ROUTES_SUCCESS:
        return {
          ...state,
          getParticularRoutes: {
            ...state.getParticularRoutes,
            data: action.payload,
            success: true,
          },
        };
      case GET_PARTICULAR_ROUTES_ERROR:
        return {
          ...state,
          getParticularRoutes: {
            ...state.getParticularRoutes,
            error: action.payload,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getAllPossibleRoutesReducer;