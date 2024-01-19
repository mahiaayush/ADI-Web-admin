import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_API_MASTER_API,
  GET_API_MASTER_SUCCESS,
  GET_API_MASTER_ERROR,

  POST_API_MASTER_SUCCESS,
  POST_API_MASTER_ERROR,
  PUT_API_MASTER_SUCCESS,
  PUT_API_MASTER_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const deleteApiMaster = (EntityclgId: number) => async dispatch => {
  return http.delete(`${ADMIN_API_ENDPOINT_V2}${GET_API_MASTER_API}/${EntityclgId}`)
    .then((res) => {
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const getApiMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_API_MASTER_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_API_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_API_MASTER_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      dispatch({
        type: GET_API_MASTER_ERROR,
        payload: [],
      });
      console.log("erroraction", err)
    })
}

const saveApi = (apiData: any) => (dispatch) => {
  return http.post(`${ADMIN_API_ENDPOINT_V2}${GET_API_MASTER_API}`, apiData)
    .then((res) => {
      const { data, status, message, errorMessage } = res.data;
      if (res.data.status) {
        dispatch({
          type: POST_API_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_API_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess: status, message: message || errorMessage };
    }).catch(err => {
      return { isSuccess: true, message: err.message };
    })
}

const updateApi = (ENTITYCLG_ID: number, apiData: any) => (dispatch) => {
  return http.put(`${ADMIN_API_ENDPOINT_V2}${GET_API_MASTER_API}/${ENTITYCLG_ID}`, apiData)
    .then((res) => {
      const { data, status, message, errorMessage } = res.data;
      if (res.data.status) {
        dispatch({
          type: PUT_API_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_API_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { status, message: message || errorMessage };
    })
}
export { getApiMaster, deleteApiMaster, saveApi, updateApi }