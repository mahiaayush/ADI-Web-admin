import { GET_VIEW_FEEDBACK_SUCCESS, GET_VIEW_FEEDBACK_ERROR } from "../constants";

const initialState = {
  viewFeedback: {
    data: {},
  },
};

const viewFeedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIEW_FEEDBACK_SUCCESS:
      return {
        ...state,
        viewFeedback: {
          ...state.viewFeedback,
          data: action.payload,
          success: true,
        },
      };
    case GET_VIEW_FEEDBACK_ERROR:
      return {
        ...state,
        viewFeedback: {
          ...state.viewFeedback,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default viewFeedbackReducer;
