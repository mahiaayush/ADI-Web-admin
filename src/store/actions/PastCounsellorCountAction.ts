import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_PAST_COUNSELLOR_COUNTS,
  GET_PAST_COUNSELLOR_COUNTS_SUCCESS,
  GET_PAST_COUNSELLOR_COUNTS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const PastCounsellorCountAction = (StartDate = null, EndDate = null) => async (dispatch) => {
  const query = queryBuilder({
    StartDate,
      EndDate
  });
  // if (!StartDate && EndDate) {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_PAST_COUNSELLOR_COUNTS}?EndDate=${EndDate}`;
  // } else if (StartDate && !EndDate) {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_PAST_COUNSELLOR_COUNTS}?StartDate=${StartDate}`;
  // } else if (!StartDate && !EndDate) {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_PAST_COUNSELLOR_COUNTS}`;
  // } else {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_PAST_COUNSELLOR_COUNTS}?StartDate=${StartDate}&EndDate=${EndDate}`;
  // }
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_PAST_COUNSELLOR_COUNTS}?${query}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_PAST_COUNSELLOR_COUNTS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_PAST_COUNSELLOR_COUNTS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default PastCounsellorCountAction