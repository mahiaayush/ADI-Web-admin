import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ENTITY_ITEM_DETAILS,
  GET_ENTITY_ITEM_DETAILS_SUCCESS,
  GET_ENTITY_ITEM_DETAILS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

export const getEntityItemDetail = (EntityId = null, page = null, limit = null, search = null) => (dispatch) => {
  const query = queryBuilder({
    EntityId,
    page,
    limit,
    search
});
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITY_ITEM_DETAILS}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.status) {
                dispatch({
                    type: GET_ENTITY_ITEM_DETAILS_SUCCESS,
                    payload: res.data.data,
                  });
            } else {
                dispatch({
                  type: GET_ENTITY_ITEM_DETAILS_ERROR,
                  payload: res.data,
                });
              }
        }).catch(err => {
        })
}
