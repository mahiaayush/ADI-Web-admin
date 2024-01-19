import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_RMOEMPLOYMENTSTATUS_API,
  GET_RMOEMPLOYMENTSTATUS_SUCCESS,
  GET_RMOEMPLOYMENTSTATUS_ERROR,
  DELETE_RMOEMPLOYMENTSTATUS_API,
  EXPORT_RMOEMPLOYMENTSTATUS_API,
  IMPORT_RMOEMPLOYMENTSTATUS_API,
  CREATE_RMOEMPLOYMENTSTATUS_API,
  EXPORT_ALL_RMOEMPLOYMENTSTATUS_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getRMOEmployment = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RMOEMPLOYMENTSTATUS_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Employment Status----->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_RMOEMPLOYMENTSTATUS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_RMOEMPLOYMENTSTATUS_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteRMOEmployment = (empStatusRegcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_RMOEMPLOYMENTSTATUS_API}/${empStatusRegcarId}`)
    .then((res) => {
      console.log("delete RMOEmployment----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const importRMOEmployment = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_RMOEMPLOYMENTSTATUS_API}`, formData)
    .then((res) => {
      console.log("import RMOemployment----------->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    })
    .catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: err };
    })
}
const exportRMOEmployment = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_RMOEMPLOYMENTSTATUS_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'RMOEmployment.xlsx';
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
const exportAllRMOEmployment = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_RMOEMPLOYMENTSTATUS_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllRMOEmployment.xlsx';
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
const CreateRMOEmployment = (EmployMentData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RMOEMPLOYMENTSTATUS_API}`, EmployMentData).then((res) => {
    console.log("Create RMOEmployment----->", res, '==>', res.data.isSuccess);
    if (res.data.isSuccess === true) {
      return { data: res.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

const EditRMOEmployment = (empStatusRegcarId: number, empStatusData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RMOEMPLOYMENTSTATUS_API}/${empStatusRegcarId}`, empStatusData).then((res) => {
    console.log("EditRMOEmployment----->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getRMOEmployment,
  deleteRMOEmployment,
  importRMOEmployment,
  exportRMOEmployment,
  exportAllRMOEmployment,
  CreateRMOEmployment,
  EditRMOEmployment
}
