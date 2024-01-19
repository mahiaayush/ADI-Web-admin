import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ALL_ENTITIES,
  GET_ALL_ENTITIES_SUCCESS,
  GET_ALL_ENTITIES_ERROR,
} from "src/store/constants";

const getAllEntity = (name) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ALL_ENTITIES}?EntityName=${name}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_ALL_ENTITIES_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_ALL_ENTITIES_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export default getAllEntity