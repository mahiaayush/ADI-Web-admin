import {
    CHANGE_ENTITY_PACKAGE_SUCCESS,
    CHANGE_ENTITY_PACKAGE_ERROR,
  } from "../constants";
  
  const initialState = {
    changeEntityPackageResponse: {
      data: {},
    }
  };
  
  const changeEntityPackageReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_ENTITY_PACKAGE_SUCCESS:
        return {
          ...state,
          changeEntityPackageResponse: {
            ...state.changeEntityPackageResponse,
            data: action.payload,
            success: true,
          },
        };
      case CHANGE_ENTITY_PACKAGE_ERROR:
        return {
          ...state,
          changeEntityPackageResponse: {
            ...state.changeEntityPackageResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default changeEntityPackageReducer;