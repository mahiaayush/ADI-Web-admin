import {
  GET_RMOBENCHMARKHOUR_SUCCESS,
  GET_RMOBENCHMARKHOUR_ERROR,
} from "../constants";

const initialState = {
  RMOBenchmarkhourResponse: {
    data: {},
  }
};

const RMOBenchmarkhourReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RMOBENCHMARKHOUR_SUCCESS:
      return {
        ...state,
        RMOBenchmarkhourResponse: {
          ...state.RMOBenchmarkhourResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_RMOBENCHMARKHOUR_ERROR:
      return {
        ...state,
        RMOBenchmarkhourResponse: {
          ...state.RMOBenchmarkhourResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default RMOBenchmarkhourReducer;