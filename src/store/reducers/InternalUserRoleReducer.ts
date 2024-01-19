import { GET_INTERNAL_USER_ROLES_SUCCESS, GET_INTERNAL_USER_ROLES_ERROR } from "../constants";

const initialState = {
  internalUserRoleResponse: {
    data: [],
  },
};

const InternalUserRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INTERNAL_USER_ROLES_SUCCESS:
      return {
        ...state,
        internalUserRoleResponse: {
          ...state.internalUserRoleResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_INTERNAL_USER_ROLES_ERROR:
      return {
        ...state,
        internalUserRoleResponse: {
          ...state.internalUserRoleResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default InternalUserRoleReducer;
