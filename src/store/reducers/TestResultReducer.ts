import { TEST_RESULT_SUCCESS, TEST_RESULT_ERROR } from "../constants";

const initialState = {
  testResultResponse: {
    data: {},
  },
};

const TestResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEST_RESULT_SUCCESS:
      return {
        ...state,
        testResultResponse: {
          ...state.testResultResponse,
          data: action.payload,
          success: true,
        },
      };
    case TEST_RESULT_ERROR:
      return {
        ...state,
        testResultResponse: {
          ...state.testResultResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default TestResultReducer;
