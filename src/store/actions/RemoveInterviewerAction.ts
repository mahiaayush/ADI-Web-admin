import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  DELETE_INTERVIEWER,
  DELETE_INTERVIEWER_SUCCESS,
  DELETE_INTERVIEWER_ERROR
} from "src/store/constants";

export const RemoveInterviewerAction = (InterviewerId) => async (dispatch) => {
    try {
      const res = await http.delete(
        `${ADMIN_API_ENDPOINT_V2}${DELETE_INTERVIEWER}?interviewerId=${InterviewerId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: DELETE_INTERVIEWER_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: DELETE_INTERVIEWER_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
