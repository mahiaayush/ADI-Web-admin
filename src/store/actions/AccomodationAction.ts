import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ACCOMODATION_API,
  EXPORT_ACCOMODATION_ALLDATA_API,
  GET_ACCOMODATION_SUCCESS,
  GET_ACCOMODATION_ERROR,
  EXPORT_ACCOMODATION_API,
  IMPORT_ACCOMODATION_API,
  POST_ACCOMODATION_SUCCESS,
  POST_ACCOMODATION_ERROR,
  PUT_ACCOMODATION_SUCCESS,
  PUT_ACCOMODATION_ERROR,
  GET_ACCOMODATION_TYPE,
  GET_ACCOMODATION_TYPE_SUCCESS,
  GET_ACCOMODATION_TYPE_ERROR,
  GET_ACCOMODATION_TYPE_LIST,
  GET_ACCOMODATION_TYPE_LIST_SUCCESS,
  GET_ACCOMODATION_TYPE_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getAccomodation = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCOMODATION_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACCOMODATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ACCOMODATION_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteAccomodation = (entityAmId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCOMODATION_API}/${entityAmId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportAccomodationAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACCOMODATION_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'accomodationMapper.xlsx';
      link.click();
      if (res.data) {
        return { data: res.data, error: null };
      }
      return { data: null, error: res.data.detail.message };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err };
    })
}
const exportAccomodation = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACCOMODATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'accomodationMapper.xlsx';
      link.click();
      if (res.data) {
        return { data: res.data, error: null };
      }
      return { data: null, error: res.data.detail.message };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err };
    })
}
const importAccomodation = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ACCOMODATION_API}`, fromData)
    .then((res) => {
      console.log("importAccomodation", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}

const saveAccomodation = (AccomodationeData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCOMODATION_API}`, AccomodationeData)
    .then((res) => {
      console.log("saveAccomodation", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_ACCOMODATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_ACCOMODATION_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateAccomodation = (entityAmId: number, AccomodationeData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCOMODATION_API}/${entityAmId}`, AccomodationeData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_ACCOMODATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_ACCOMODATION_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getAccomodation, deleteAccomodation, exportAccomodation, importAccomodation, saveAccomodation, updateAccomodation, exportAccomodationAll }