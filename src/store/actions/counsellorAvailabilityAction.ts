import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_AVAILABILITY_URL,
  GET_COUNSELLOR_AVAILABILITY_SUCCESS,
  GET_COUNSELLOR_AVAILABILITY_ERROR,
} from "src/store/constants";

export const getCounsellorAvailability = (userSID) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_AVAILABILITY_URL}/${userSID}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_COUNSELLOR_AVAILABILITY_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_COUNSELLOR_AVAILABILITY_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
        })
}
