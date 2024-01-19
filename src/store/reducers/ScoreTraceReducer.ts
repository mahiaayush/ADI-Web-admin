import {
    GET_SCORE_TRACE_SUCCESS,
    GET_SCORE_TRACE_ERROR,
  } from "../constants";
  
  const initialState = {
    scoreTraceResponse: {
      data: {},
    }
  };
  
  const ScoreTraceReducers = (state = initialState, action) => {
    switch (action.type) {
      case GET_SCORE_TRACE_SUCCESS:
        return {
          ...state,
          scoreTraceResponse: {
            ...state.scoreTraceResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_SCORE_TRACE_ERROR:
        return {
          ...state,
          scoreTraceResponse: {
            ...state.scoreTraceResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ScoreTraceReducers;