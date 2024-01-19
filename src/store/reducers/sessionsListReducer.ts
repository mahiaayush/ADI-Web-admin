import { GET_SESSIONS_SUCCESS, GET_SESSIONS_ERROR } from "../constants";

const initialState = {
  sessionsListResult: {
    data: [],
  },
};

const sessionsListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS_SUCCESS:
      return {
        ...state,
        sessionsListResult: {
          ...state.sessionsListResult,
          data: action.payload,
          success: true,
        },
      };
    case GET_SESSIONS_ERROR:
      return {
        ...state,
        sessionsListResult: {
          ...state.sessionsListResult,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default sessionsListReducer;
