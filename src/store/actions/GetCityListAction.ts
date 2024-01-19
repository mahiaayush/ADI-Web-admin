import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    CITY_DATA,
    GET_CITY_LIST_SUCCESS,
    GET_CITY_LIST_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

export const getCityListAction = (page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    sortBy,
    order,
});  
    return http.get(`${ADMIN_API_ENDPOINT_V2}${CITY_DATA}${query ? `?${query}` : ``}`)
    .then((res) => {
        if (res.data.status) {
            dispatch({
                type: GET_CITY_LIST_SUCCESS,
                payload: res.data.data,
              });
        } else {
            dispatch({
              type: GET_CITY_LIST_ERROR,
              payload: res.data,
            });
          }
    }).catch(err => {
    })
  };
