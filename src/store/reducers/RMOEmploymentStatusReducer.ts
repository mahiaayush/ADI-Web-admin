import {
  GET_RMOEMPLOYMENTSTATUS_SUCCESS,
  GET_RMOEMPLOYMENTSTATUS_ERROR,
} from "../constants";

const initialState = {
  RMOEmploymentResponse: {
    data: {},
  }
};

const RMOEmploymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RMOEMPLOYMENTSTATUS_SUCCESS:
      return {
        ...state,
        RMOEmploymentResponse: {
          ...state.RMOEmploymentResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_RMOEMPLOYMENTSTATUS_ERROR:
      return {
        ...state,
        RMOEmploymentResponse: {
          ...state.RMOEmploymentResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default RMOEmploymentReducer;