import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_DETAILS_URL,
  GET_COUNSELLOR_DETAILS_SUCCESS,
  GET_COUNSELLOR_DETAILS_ERROR,
} from "src/store/constants";

export const getCounsellorDetails = (userSID) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_DETAILS_URL}?UserSid=${userSID}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_COUNSELLOR_DETAILS_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_COUNSELLOR_DETAILS_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}
