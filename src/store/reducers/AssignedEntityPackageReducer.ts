import {
    POST_ENTITY_PACKAGE_SUCCESS,
    POST_ENTITY_PACKAGE_ERROR,
  } from "../constants";
  
  const initialState = {
    postEntityPackageResponse: {
      data: {},
    }
  };
  
  const AssignedEntityPackageReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_ENTITY_PACKAGE_SUCCESS:
        return {
          ...state,
          postEntityPackageResponse: {
            ...state.postEntityPackageResponse,
            data: action.payload,
            success: true,
          },
        };
      case POST_ENTITY_PACKAGE_ERROR:
        return {
          ...state,
          postEntityPackageResponse: {
            ...state.postEntityPackageResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default AssignedEntityPackageReducer;