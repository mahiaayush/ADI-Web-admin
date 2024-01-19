import {
  GET_MASTERDEGREE_SUCCESS,
  GET_MASTERDEGREE_ERROR,
} from "../constants";

const initialState = {
  DegreeResponse: {
    data: {},
  }
};

const DegreeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASTERDEGREE_SUCCESS:
      return {
        ...state,
        DegreeResponse: {
          ...state.DegreeResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_MASTERDEGREE_ERROR:
      return {
        ...state,
        DegreeResponse: {
          ...state.DegreeResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default DegreeReducer;