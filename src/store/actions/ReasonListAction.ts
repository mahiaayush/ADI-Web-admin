import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT,
  GET_REASON_LIST,
  GET_REASON_SUCCESS,
  GET_REASON_ERROR,
} from "src/store/constants";

const ReasonListAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT}${GET_REASON_LIST}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_REASON_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_REASON_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default ReasonListAction