import {
    GET_RBAC_POSSIBLE_APIS_SUCCESS,
    GET_RBAC_POSSIBLE_APIS_ERROR
  } from "src/store/constants";
  
  const initialState = {
    getAllPossibleApis: {
      data: [],
    },
  };
  
  const getAllPossibleApisReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_RBAC_POSSIBLE_APIS_SUCCESS:
        return {
          ...state,
          getAllPossibleApis: {
            ...state.getAllPossibleApis,
            data: action.payload,
            success: true,
          },
        };
      case GET_RBAC_POSSIBLE_APIS_ERROR:
        return {
          ...state,
          getAllPossibleApis: {
            ...state.getAllPossibleApis,
            error: action.payload,
            data: [],
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default getAllPossibleApisReducer;