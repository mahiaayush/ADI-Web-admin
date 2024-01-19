import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ENTITY_PACKAGE,
  GET_ENTITY_PACKAGE_SUCCESS,
  GET_ENTTIY_PACKAGE_ERROR,
} from "src/store/constants";

const getEntityPackageAction = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITY_PACKAGE}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_ENTITY_PACKAGE_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_ENTTIY_PACKAGE_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
        })
}

export default getEntityPackageAction;
