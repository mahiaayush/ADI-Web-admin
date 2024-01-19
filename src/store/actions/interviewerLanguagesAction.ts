import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ACTIVE_LANGUAGES,
  GET_LANGUAGES_SUCCESS,
  GET_LANGUAGES_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const interviewerLanguagesAction = () => async (dispatch) => {
    // console.log("testInter", testInvitationId)
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_LANGUAGES}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_LANGUAGES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_LANGUAGES_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default interviewerLanguagesAction
