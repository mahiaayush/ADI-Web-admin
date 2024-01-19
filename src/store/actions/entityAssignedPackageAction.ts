import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ENTITIES_ASSIGNED_PACKAGE,
  ENTITIES_ASSIGNED_PACKAGE_SUCCESS,
  ENTITIES_ASSIGNED_PACKAGE_ERROR,
} from "src/store/constants";

export const getEntityAssignedPackage = (EntityId) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_ASSIGNED_PACKAGE}/${EntityId}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: ENTITIES_ASSIGNED_PACKAGE_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: ENTITIES_ASSIGNED_PACKAGE_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
        })
}
