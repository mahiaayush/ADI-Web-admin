import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_SESSIONS_DETAIL,
  GET_SESSIONS_DETAIL_SUCCESS,
  GET_SESSIONS_DETAIL_ERROR,
} from "../constants";

const sessionsDetailAction = (scheduledId) => async (dispatch) => {
  try {
    const res = await http.get(
      `${ADMIN_API_ENDPOINT_V2}${GET_SESSIONS_DETAIL}?ScheduleId=${scheduledId}`
    );
    if (res.data.status === true) {
      dispatch({
        type: GET_SESSIONS_DETAIL_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_SESSIONS_DETAIL_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export default sessionsDetailAction;
