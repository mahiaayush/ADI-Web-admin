import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_API_DATA,
  GET_COUNSELLOR_API_DATA_SUCCESS,
  GET_COUNSELLOR_API_DATA_ERROR
} from "src/store/constants";

export const DetailAction = (sid) => async (dispatch) => {
  // console.log("sid", sid);
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_API_DATA}/${sid}`,
      );
      // console.log("DetailAction", res);

      if (res.data.status) {
        dispatch({
          type: GET_COUNSELLOR_API_DATA_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_API_DATA_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };