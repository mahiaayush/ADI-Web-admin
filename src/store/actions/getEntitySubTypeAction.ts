import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ENTITYSUBTYPE_ENTITY_API,
  GET_ENTITYSUBTYPE_SUCCESS,
  GET_ENTITYSUBTYPE_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getEntitySubType = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ENTITYSUBTYPE_ENTITY_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_ENTITYSUBTYPE_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_ENTITYSUBTYPE_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export { getEntitySubType }