import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  DELETE_SESSION_OVERRIDE,
  DELETE_SESSION_OVERRIDE_SUCCESS,
  DELETE_SESSION_OVERRIDE_ERROR
} from "src/store/constants";

export const ChangeSessionOverrideAction = (OverrideId) => async (dispatch) => {
    try {
      const res = await http.delete(
        `${ADMIN_API_ENDPOINT_V2}${DELETE_SESSION_OVERRIDE}?OverrideId=${OverrideId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: DELETE_SESSION_OVERRIDE_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: DELETE_SESSION_OVERRIDE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
