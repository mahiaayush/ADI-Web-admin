import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT,
  CHANGE_COUNSELLOR_URL,
  CHANGE_COUNSELLOR_SUCCESS,
  CHANGE_COUNSELLOR_ERROR
} from "src/store/constants";

export const ChangeCounsellorAction = (ScheduleId) => async (dispatch) => {
    try {
      const res = await http.put(
        `${ADMIN_API_ENDPOINT}${CHANGE_COUNSELLOR_URL}`,
        {
            "ScheduleId": ScheduleId
        }
      );
      if (res.data.status === true) {
        dispatch({
          type: CHANGE_COUNSELLOR_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: CHANGE_COUNSELLOR_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
