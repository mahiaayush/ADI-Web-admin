import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_OVERVIEW,
  GET_COUNSELLOR_OVERVIEW_DATA_SUCCESS,
  GET_COUNSELLOR_OVERVIEW_DATA_ERROR
} from "src/store/constants";

export const getCounsellorOverviewData = (userSID) => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_OVERVIEW}?UserSid=${userSID}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_COUNSELLOR_OVERVIEW_DATA_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_OVERVIEW_DATA_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
