import {
    GET_ALL_POSSIBLE_ROUTES_SUCCESS,
    GET_ALL_POSSIBLE_ROUTES_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    getAllPossibleRotes: {
      data: [],
    },
  };
  
  const getAllPossibleRoutesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_POSSIBLE_ROUTES_SUCCESS:
        return {
          ...state,
          getAllPossibleRotes: {
            ...state.getAllPossibleRotes,
            data: action.payload,
            success: true,
          },
        };
      case GET_ALL_POSSIBLE_ROUTES_ERROR:
        return {
          ...state,
          getAllPossibleRotes: {
            ...state.getAllPossibleRotes,
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