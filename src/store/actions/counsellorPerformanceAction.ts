import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  COUNSELLOR_PERFORMANCE,
  COUNSELLOR_PERFORMANCE_SUCCESS,
  COUNSELLOR_PERFORMANCE_ERROR,
} from "src/store/constants";

const counsellorPerformanceAction = (id, filter) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${COUNSELLOR_PERFORMANCE}?UserSid=${id}&filter=${filter}`
      );
      if (res.data.status === true) {
        dispatch({
          type: COUNSELLOR_PERFORMANCE_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: COUNSELLOR_PERFORMANCE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default counsellorPerformanceAction