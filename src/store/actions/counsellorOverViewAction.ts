import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_OVERVIEW_URL,
  GET_COUNSELLOR_OVERVIEW_SUCCESS,
  GET_COUNSELLOR_OVERVIEW_ERROR
} from "src/store/constants";

export const getCounsellorOverview = (userSID) => (dispatch) => {
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_OVERVIEW_URL}?UserSid=${userSID}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_COUNSELLOR_OVERVIEW_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_OVERVIEW_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
