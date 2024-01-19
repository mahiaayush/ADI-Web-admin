import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_EXCEPTION_URL,
  GET_COUNSELLOR_EXCEPTION_SUCCESS,
  GET_COUNSELLOR_EXCEPTION_ERROR,
} from "src/store/constants";

export const getCounsellorException = (userSID) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_EXCEPTION_URL}/${userSID}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_COUNSELLOR_EXCEPTION_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_COUNSELLOR_EXCEPTION_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
        })
}
