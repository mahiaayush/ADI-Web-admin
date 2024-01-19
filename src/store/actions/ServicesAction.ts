import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_BYPASS,
    ADMIN_API_ENDPOINT_V2,
    GET_SERVICES_API,
    GET_SERVICES_SUCCESS,
    GET_SERVICES_ERROR,
    DELETE_SERVICE_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getServices = (page = 0, limit = 50) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit
    });
    const url = `${ADMIN_DATA_API_ENDPOINT_BYPASS}${GET_SERVICES_API}${query ? `?${query}` : ``}`;
    return http.get(url)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_SERVICES_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_SERVICES_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            dispatch({
                type: GET_SERVICES_ERROR,
                payload: err.message,
            });
        })
}

const deleteService = (id: string) => async dispatch => {
    const url = (`${ADMIN_API_ENDPOINT_V2}${DELETE_SERVICE_API}/${id}`);
    return http.delete(url)
          .then((res) => {
            if (res.data.status === true) {
              return { ...res, error: null };
            }
            return { data: null, error: res.data };
          }).catch(err => {
            return { data: null, error: err };             
          })
  }

export {
    getServices,
    deleteService
}