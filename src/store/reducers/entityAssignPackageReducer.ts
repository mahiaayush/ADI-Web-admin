import {
    ENTITIES_ASSIGN_PACKAGE_SUCCESS,
    ENTITIES_ASSIGN_PACKAGE_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    entityAssignPackage: {
      data: {},
    }
  };
  
  const entityAssignPackageReducer = (state = initialState, action) => {
    switch (action.type) {
      case ENTITIES_ASSIGN_PACKAGE_SUCCESS:
        return {
          ...state,
          entityActivePlan: {
            ...state.entityAssignPackage,
            data: action.payload,
            success: true,
          },
          
        };
      case ENTITIES_ASSIGN_PACKAGE_ERROR:
        return {
          ...state,
          entityActivePlan: {
            ...state.entityAssignPackage,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityAssignPackageReducer;