import { GET_ENTITY_PACKAGE_SUCCESS, GET_ENTTIY_PACKAGE_ERROR } from "../constants";

const initialState = {
  getEntityPackageResponse: {
    data: [],
  },
};

const EntityPackageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTITY_PACKAGE_SUCCESS:
      return {
        ...state,
        getEntityPackageResponse: {
          ...state.getEntityPackageResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_ENTTIY_PACKAGE_ERROR:
      return {
        ...state,
        getEntityPackageResponse: {
          ...state.getEntityPackageResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default EntityPackageReducer;
