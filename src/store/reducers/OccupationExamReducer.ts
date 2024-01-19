import {
  GET_OCCUPATIONEXAM_SUCCESS,
  GET_OCCUPATIONEXAM_ERROR,
} from "../constants";

const initialState = {
  OccupationExamResponse: {
    data: {},
  }
};

const OccupationExamReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OCCUPATIONEXAM_SUCCESS:
      return {
        ...state,
        OccupationExamResponse: {
          ...state.OccupationExamResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_OCCUPATIONEXAM_ERROR:
      return {
        ...state,
        OccupationExamResponse: {
          ...state.OccupationExamResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default OccupationExamReducer;