import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_CSMP_URL,
  GET_CSMP_SUCCESS,
  GET_CSMP_ERROR,
} from "src/store/constants";

const getCSMPAction = (scheduleId, userSId) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_CSMP_URL}${scheduleId}?userSid=${userSId}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_CSMP_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_CSMP_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export default getCSMPAction