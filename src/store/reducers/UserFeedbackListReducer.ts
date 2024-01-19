import { GET_FEEDBACKLIST_SUCCESS, GET_FEEDBACKLIST_ERROR } from "../constants";

const initialState = {
  feedbackResponse: {
    data: [],
  },
};

const UserFeedbackListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FEEDBACKLIST_SUCCESS:
      return {
        ...state,
        feedbackResponse: {
          ...state.feedbackResponse,
          data: action.payload.result,
          found: action.payload.found,
          success: true,
        },
      };
    case GET_FEEDBACKLIST_ERROR:
      return {
        ...state,
        feedbackResponse: {
          ...state.feedbackResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default UserFeedbackListReducer;
