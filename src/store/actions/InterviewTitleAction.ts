import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_INTERVIEW_TITLE,
  INTERVIEW_TITLE_SUCCESS,
  INTERVIEW_TITLE_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const InterviewTitleAction = () => async (dispatch) => {
    // console.log("testInter", testInvitationId)
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_INTERVIEW_TITLE}`
      );
      if (res.data.status === true) {
        dispatch({
          type: INTERVIEW_TITLE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: INTERVIEW_TITLE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default InterviewTitleAction
