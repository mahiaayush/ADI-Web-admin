import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_ENTITY_USER_DETAILS,
    GET_ENTITY_USER_DETAILS_SUCCESS,
    GET_ENTITY_USER_DETAILS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

export const getEntityUserDetails = (EntityId, EntityPackageId, page = null, limit = null, search = null) => async (dispatch) => {
  const query = queryBuilder({
    EntityId,
    EntityPackageId,
    page,
    limit,
    search
});  
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITY_USER_DETAILS}${query ? `?${query}` : ``}`)
    .then((res) => {
        if (res.data.status) {
            dispatch({
                type: GET_ENTITY_USER_DETAILS_SUCCESS,
                payload: res.data.data,
              });
        } else {
            dispatch({
              type: GET_ENTITY_USER_DETAILS_ERROR,
              payload: res.data,
            });
          }
    }).catch(err => {
    })
  };
