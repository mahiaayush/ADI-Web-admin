import { GET_OLD_ACTIONPLAN_SUCCESS, GET_OLD_ACTIONPLAN_ERROR } from "../constants";

const initialState = {
  learnerAllActionplans: {
    data: [],
  },
};

const AllActionPlansReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OLD_ACTIONPLAN_SUCCESS:
      return {
        ...state,
        learnerAllActionplans: {
          ...state.learnerAllActionplans,
          data: action.payload,
          success: true,
        },
      };
    case GET_OLD_ACTIONPLAN_ERROR:
      return {
        ...state,
        learnerAllActionplans: {
          ...state.learnerAllActionplans,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default AllActionPlansReducer;
