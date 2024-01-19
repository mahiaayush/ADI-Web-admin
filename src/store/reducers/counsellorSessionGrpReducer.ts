import {
    GET_COUNSELLOR_SESSION_GRP_SUCCESS,
    GET_COUNSELLOR_SESSION_GRP_ERROR,
  } from "../constants";
  
  const initialState = {
    CounsellorSessionGrpResponse: {
      data: {},
    }
  };
  
  const CounsellorSessionGrpReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_SESSION_GRP_SUCCESS:
        return {
          ...state,
          CounsellorSessionGrpResponse: {
            ...state.CounsellorSessionGrpResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_COUNSELLOR_SESSION_GRP_ERROR:
        return {
          ...state,
          CounsellorSessionGrpResponse: {
            ...state.CounsellorSessionGrpResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default CounsellorSessionGrpReducer;