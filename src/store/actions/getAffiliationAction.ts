import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_AFFILITION_MASTER_API,
  GET_AFFILITION_MASTER_SUCCESS,
  GET_AFFILITION_MASTER_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getAffilitionMaster = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_AFFILITION_MASTER_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_AFFILITION_MASTER_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_AFFILITION_MASTER_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export { getAffilitionMaster }