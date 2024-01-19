import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT,
  GET_ACTION_PLAN_URL,
  GET_ACTION_PLAN_SUCCESS,
  GET_ACTION_PLAN_ERROR,
} from "src/store/constants";

const getActionPlan = (scheduleId) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_ACTION_PLAN_URL}/${scheduleId}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_ACTION_PLAN_SUCCESS,
                    payload: res.data.data.response,
                  });
            } else {
                dispatch({
                  type: GET_ACTION_PLAN_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export default getActionPlan