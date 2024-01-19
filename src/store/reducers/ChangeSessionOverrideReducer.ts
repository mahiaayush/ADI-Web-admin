import {
    DELETE_SESSION_OVERRIDE_SUCCESS,
    DELETE_SESSION_OVERRIDE_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    ChangeSessionOverrideResponse: {
      data: {},
    }
  };
  
  const ChangeSessionOverrideReducer = (state = initialState, action) => {
    switch (action.type) {
      case DELETE_SESSION_OVERRIDE_SUCCESS:
        return {
          ...state,
          ChangeSessionOverrideResponse: {
            ...state.ChangeSessionOverrideResponse,
            data: action.payload,
            success: true,
          },
        };
      case DELETE_SESSION_OVERRIDE_ERROR:
        return {
          ...state,
          ChangeSessionOverrideResponse: {
            ...state.ChangeSessionOverrideResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ChangeSessionOverrideReducer;