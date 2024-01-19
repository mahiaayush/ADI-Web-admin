import { GET_PLANS_SUCCESS, GET_PLANS_ERROR } from "../constants";

const initialState = {
  getPlanResponse: {
    data: [],
  },
};

const GetPlansReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLANS_SUCCESS:
      return {
        ...state,
        getPlanResponse: {
          ...state.getPlanResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_PLANS_ERROR:
      return {
        ...state,
        getPlanResponse: {
          ...state.getPlanResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetPlansReducer;
