import http from "../../utils/http";
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT,
    GET_COUNSELLOR_STATUS_DATA_URL,
    GET_COUNSELLOR_STATUS_DATA_SUCCESS,
    GET_COUNSELLOR_STATUS_DATA_ERROR
} from "src/store/constants";

export const counsellorStatusData = (filter = null) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT}${GET_COUNSELLOR_STATUS_DATA_URL}${`?filter=${filter}`}`,
      );
      // console.log("DetailAction", `${ADMIN_API_ENDPOINT}${GET_COUNSELLOR_STATUS_DATA_URL}${`?filter=${filter}`}`);

      if (res.data.status) {
        dispatch({
          type: GET_COUNSELLOR_STATUS_DATA_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_STATUS_DATA_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };