import {
    GET_COUNSELLOR_RATING_SUCCESS,
    GET_COUNSELLOR_RATING_ERROR,
  } from "../constants";
  
  const initialState = {
    CounsellorRatingResponse: {
      data: {},
    }
  };
  
  const CounsellorRatingReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_RATING_SUCCESS:
        return {
          ...state,
          CounsellorRatingResponse: {
            ...state.CounsellorRatingResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_COUNSELLOR_RATING_ERROR:
        return {
          ...state,
          CounsellorRatingResponse: {
            ...state.CounsellorRatingResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default CounsellorRatingReducer;