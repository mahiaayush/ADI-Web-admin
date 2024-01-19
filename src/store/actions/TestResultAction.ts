import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_TEST_RESULT,
  TEST_RESULT_SUCCESS,
  TEST_RESULT_ERROR,
} from "src/store/constants";

const TestResultAction = (testInvitationId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_TEST_RESULT}/${testInvitationId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: TEST_RESULT_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: TEST_RESULT_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default TestResultAction
