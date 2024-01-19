import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_COUNTS,
  GET_COUNSELLOR_COUNTS_SUCCESS,
  GET_COUNSELLOR_COUNTS_ERROR,
} from "src/store/constants";

const CounsellorCountAction = (StartDate, EndDate) => async (dispatch) => {
  let query;
  if (!StartDate && EndDate) {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_COUNTS}?EndDate=${EndDate}`;
  } else if (StartDate && !EndDate) {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_COUNTS}?StartDate=${StartDate}`;
  } else if (!StartDate && !EndDate) {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_COUNTS}`;
  } else {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_COUNTS}?StartDate=${StartDate}&EndDate=${EndDate}`;
  }
    try {
      const res = await http.get(
        query
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_COUNSELLOR_COUNTS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_COUNTS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default CounsellorCountAction