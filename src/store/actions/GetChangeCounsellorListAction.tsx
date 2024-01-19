import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_CHANGE_COUNSELLOR_URL,
  GET_CHANGE_COUNSELLOR_SUCCESS,
  GET_CHANGE_COUNSELLOR_ERROR,
} from "src/store/constants";

export const getChangeCounsellorList = (ScheduleId, ApplicationId) =>
  async (dispatch) => {
    try {
      if (ScheduleId !== null) {
        const res = await http.get(
          `${ADMIN_API_ENDPOINT_V2}${GET_CHANGE_COUNSELLOR_URL}?ScheduleId=${ScheduleId}&ApplicationId=${ApplicationId}`
        );
        if (res.data.status === true) {
          dispatch({
            type: GET_CHANGE_COUNSELLOR_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_CHANGE_COUNSELLOR_ERROR,
            payload: [],
          });
        }
      } else {
        dispatch({
          type: GET_CHANGE_COUNSELLOR_SUCCESS,
          payload: [],
        });
      }
    } catch (error) {
      console.log("error", error);
      dispatch({
        type: GET_CHANGE_COUNSELLOR_ERROR,
        payload: error.message,
      });
    }
  };
