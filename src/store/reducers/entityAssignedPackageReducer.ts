import {
    ENTITIES_ASSIGNED_PACKAGE_SUCCESS,
    ENTITIES_ASSIGNED_PACKAGE_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    entityAssignedPackage: {
      data: {},
    }
  };
  
  const entityAssignedPackageReducer = (state = initialState, action) => {
    switch (action.type) {
      case ENTITIES_ASSIGNED_PACKAGE_SUCCESS:
        return {
          ...state,
          entityAssignedPackage: {
            ...state.entityAssignedPackage,
            data: action.payload,
            success: true,
          },
          
        };
      case ENTITIES_ASSIGNED_PACKAGE_ERROR:
        return {
          ...state,
          entityAssignedPackage: {
            ...state.entityAssignedPackage,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityAssignedPackageReducer;