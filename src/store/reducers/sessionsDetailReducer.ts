import { GET_SESSIONS_DETAIL_SUCCESS, GET_SESSIONS_DETAIL_ERROR } from "../constants";

const initialState = {
  sessionsDetailResult: {
    data: {},
  },
};

const sessionsDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_DETAIL_SUCCESS:
      return {
        ...state,
        sessionsDetailResult: {
          ...state.sessionsDetailResult,
          data: action.payload,
          success: true,
        },
      };
    case GET_SESSIONS_DETAIL_ERROR:
      return {
        ...state,
        sessionsDetailResult: {
          ...state.sessionsDetailResult,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default sessionsDetailReducer;
