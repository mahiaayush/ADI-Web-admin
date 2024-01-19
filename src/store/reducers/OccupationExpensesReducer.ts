import {
  GET_OCCUPATIONEXPENSES_SUCCESS,
  GET_OCCUPATIONEXPENSES_ERROR,
} from "../constants";

const initialState = {
  OccupationExpensesResponse: {
    data: {},
  }
};

const OccupationExpensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OCCUPATIONEXPENSES_SUCCESS:
      return {
        ...state,
        OccupationExpensesResponse: {
          ...state.OccupationExpensesResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_OCCUPATIONEXPENSES_ERROR:
      return {
        ...state,
        OccupationExpensesResponse: {
          ...state.OccupationExpensesResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};

export default OccupationExpensesReducer;