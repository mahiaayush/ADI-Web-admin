import { GET_LANGUAGES_SUCCESS, GET_LANGUAGES_ERROR } from "../constants";

const initialState = {
  interviewActiveLanguages: {
    data: [],
  },
};

const interviewerLanguagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        interviewActiveLanguages: {
          ...state.interviewActiveLanguages,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_LANGUAGES_ERROR:
      return {
        ...state,
        interviewActiveLanguages: {
          ...state.interviewActiveLanguages,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default interviewerLanguagesReducer;
