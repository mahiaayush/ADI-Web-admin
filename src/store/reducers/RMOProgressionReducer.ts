import {
  GET_RMOPROGRESSION_SUCCESS,
  GET_RMOPROGRESSION_ERROR,
  GET_RMOPREGCARCODE_LIST_SUCCESS,
  GET_RMOPREGCARCODE_LIST_ERROR,
} from "../constants";

const initialState = {
  RMOProgressionResponse: {
    data: {},
  }
};

const RMOProgressionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RMOPROGRESSION_SUCCESS:
      return {
        ...state,
        RMOProgressionResponse: {
          ...state.RMOProgressionResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_RMOPROGRESSION_ERROR:
      return {
        ...state,
        RMOProgressionResponse: {
          ...state.RMOProgressionResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const listState = {
  RMOPRegCodeResponse: {
    data: {},
  }
};

const RMOPRegCodeReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_RMOPREGCARCODE_LIST_SUCCESS:
      return {
        ...state,
        RMOPRegCodeResponse: {
          ...state.RMOPRegCodeResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_RMOPREGCARCODE_LIST_ERROR:
      return {
        ...state,
        RMOPRegCodeResponse: {
          ...state.RMOPRegCodeResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};

export {
  RMOProgressionReducer,
  RMOPRegCodeReducer
}