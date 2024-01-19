import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_COLLEGE_MASTER_API,
  EXPORT_COLLEGE_MASTER_ALLDATA_API,
  GET_COLLEGE_MASTER_SUCCESS,
  GET_COLLEGE_MASTER_ERROR,
  EXPORT_COLLEGE_MASTER_API,
  IMPORT_COLLEGE_MASTER_API,
  POST_COLLEGE_MASTER_SUCCESS,
  POST_COLLEGE_MASTER_ERROR,
  PUT_COLLEGE_MASTER_SUCCESS,
  PUT_COLLEGE_MASTER_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const importCollegeMaster = (fromData: any) => async (dispatch) => {
  // http.defaults.timeout = 500;
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COLLEGE_MASTER_API}`, fromData, { timeout: 1000 * 60 })
    .then((res) => {
      console.log("importCollegeMaster", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}
const exportCollegeMasterAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COLLEGE_MASTER_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'masterCollege.xlsx';
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
const exportCollegeMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COLLEGE_MASTER_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterCollege.xlsx';
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

const deleteCollageMaster = (EntityclgId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COLLEGE_MASTER_API}/${EntityclgId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const getCollageMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COLLEGE_MASTER_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_COLLEGE_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_COLLEGE_MASTER_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const saveCollegeMaster = (collageData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COLLEGE_MASTER_API}`, collageData)
    .then((res) => {
      console.log("saveCollageMaster", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_COLLEGE_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_COLLEGE_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateCollegeMaster = (ENTITYCLG_ID: number, collageData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COLLEGE_MASTER_API}/${ENTITYCLG_ID}`, collageData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_COLLEGE_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_COLLEGE_MASTER_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}
export { getCollageMaster, deleteCollageMaster, exportCollegeMaster, importCollegeMaster, saveCollegeMaster, updateCollegeMaster, exportCollegeMasterAll }