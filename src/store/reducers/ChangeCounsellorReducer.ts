import {
    CHANGE_COUNSELLOR_SUCCESS,
    CHANGE_COUNSELLOR_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    changeCounsellorResponse: {
      data: {},
    }
  };
  
  const ChangeCounsellorReducer = (state = initialState, action) => {
    switch (action.type) {
      case CHANGE_COUNSELLOR_SUCCESS:
        return {
          ...state,
          changeCounsellorResponse: {
            ...state.changeCounsellorResponse,
            data: action.payload,
            success: true,
          },
        };
      case CHANGE_COUNSELLOR_ERROR:
        return {
          ...state,
          changeCounsellorResponse: {
            ...state.changeCounsellorResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ChangeCounsellorReducer;