import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ACCREDIATION_MASTER_API,
  GET_ACCREDIATION_MASTER_SUCCESS,
  GET_ACCREDIATION_MASTER_ERROR,
  EXPORT_ACCREDIATION_MASTER_ALLDATA_API,
  EXPORT_ACCREDIATION_MASTER_API,
  IMPORT_ACCREDIATION_MASTER_API,
  POST_ACCREDIATION_MASTER_SUCCESS,
  POST_ACCREDIATION_MASTER_ERROR,
  PUT_ACCREDIATION_MASTER_SUCCESS,
  PUT_ACCREDIATION_MASTER_ERROR,
  GET_ACCREDIATION_MASTER_LIST_API,
  GET_ACCREDIATION_MASTER_LIST_SUCCESS,
  GET_ACCREDIATION_MASTER_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getAccrediationListMaster = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCREDIATION_MASTER_LIST_API}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACCREDIATION_MASTER_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ACCREDIATION_MASTER_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const getAccrediationMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCREDIATION_MASTER_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACCREDIATION_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ACCREDIATION_MASTER_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteAccrediationMaster = (entityAmId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCREDIATION_MASTER_API}/${entityAmId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportAccrediationMasterAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACCREDIATION_MASTER_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'AccrediationMaster.xlsx';
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
const exportAccrediationMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACCREDIATION_MASTER_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'AccrediationMaster.xlsx';
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
const importAccrediationMaster = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ACCREDIATION_MASTER_API}`, fromData)
    .then((res) => {
      console.log("importAccrediationMaster", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}

const saveAccrediationMaster = (AccrediationMastereData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCREDIATION_MASTER_API}`, AccrediationMastereData)
    .then((res) => {
      console.log("saveAccrediationMaster", res.data)
      const { data, isSuccess, message, errorMessage } = res.data.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_ACCREDIATION_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_ACCREDIATION_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateAccrediationMaster = (entityAmId: number, AccrediationMastereData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCREDIATION_MASTER_API}/${entityAmId}`, AccrediationMastereData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_ACCREDIATION_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_ACCREDIATION_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getAccrediationListMaster, getAccrediationMaster, deleteAccrediationMaster, exportAccrediationMaster, importAccrediationMaster, saveAccrediationMaster, updateAccrediationMaster, exportAccrediationMasterAll }