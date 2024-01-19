import http from "../../utils/http";
import {
  GET_REGIONAL_OCCUPATION_API,
  GET_REGIONAL_OCCUPATION_SUCCESS,
  GET_REGIONAL_OCCUPATION_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_REGIONAL_OCCUPATION_LIST_API,
  GET_REGIONAL_OCCUPATION_LIST_SUCCESS,
  GET_REGIONAL_OCCUPATION_LIST_ERROR,
  EXPORT_REGIONAL_OCCUPATION_ALLDATA_API,
  EXPORT_REGIONAL_OCCUPATION_API,
  IMPORT_REGIONAL_OCCUPATION_API,
  POST_REGIONAL_OCCUPATION_SUCCESS,
  POST_REGIONAL_OCCUPATION_ERROR,
  PUT_REGIONAL_OCCUPATION_SUCCESS,
  PUT_REGIONAL_OCCUPATION_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getRMOccupationList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_REGIONAL_OCCUPATION_LIST_API}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_REGIONAL_OCCUPATION_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_REGIONAL_OCCUPATION_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const getRMOccupation = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_REGIONAL_OCCUPATION_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_REGIONAL_OCCUPATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_REGIONAL_OCCUPATION_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteRMOccupation = (RegcarCode: string) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_REGIONAL_OCCUPATION_API}/${RegcarCode}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportRMOccupationAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_REGIONAL_OCCUPATION_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'RMOccupation.xlsx';
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
const exportRMOccupation = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_REGIONAL_OCCUPATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'RMOccupation.xlsx';
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
const importRMOccupation = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_REGIONAL_OCCUPATION_API}`, fromData)
    .then((res) => {
      console.log("importCatagory", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occurred' };
    })
}

const saveRMOccupation = (RMOccupationData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_REGIONAL_OCCUPATION_API}`, RMOccupationData)
    .then((res) => {
      console.log("saveRMOccupation", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_REGIONAL_OCCUPATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_REGIONAL_OCCUPATION_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateRMOccupation = (RegcarCode: string, RMOccupationData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_REGIONAL_OCCUPATION_API}/${RegcarCode}`, RMOccupationData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_REGIONAL_OCCUPATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_REGIONAL_OCCUPATION_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getRMOccupationList, getRMOccupation, deleteRMOccupation, exportRMOccupation, importRMOccupation, saveRMOccupation, updateRMOccupation, exportRMOccupationAll }