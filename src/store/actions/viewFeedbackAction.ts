import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_VIEW_FEEDBACK,
  GET_VIEW_FEEDBACK_SUCCESS,
  GET_VIEW_FEEDBACK_ERROR,
} from "../constants";

const viewFeedbackAction = (applicationId) => async (dispatch) => {
  try {
    const res = await http.get(
      `${ADMIN_API_ENDPOINT_V2}${GET_VIEW_FEEDBACK}?applicationId=${applicationId}`
    );
    if (res.data.status === true) {
      dispatch({
        type: GET_VIEW_FEEDBACK_SUCCESS,
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: GET_VIEW_FEEDBACK_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default viewFeedbackAction;
