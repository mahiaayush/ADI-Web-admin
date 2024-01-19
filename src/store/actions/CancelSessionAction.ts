import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  CANCEL_SESSION_URL,
  CANCEL_SESSION_SUCCESS,
  CANCEL_SESSION_ERROR,
} from "src/store/constants";

export const CancelSessionAction = (ScheduleId) => async (dispatch) => {
    try {
      const res = await http.patch(
        `${ADMIN_API_ENDPOINT_V2}${CANCEL_SESSION_URL}`,
        {
            "ScheduleId": ScheduleId
        }
      );
      if (res.data.status === true) {
        dispatch({
          type: CANCEL_SESSION_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: CANCEL_SESSION_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
