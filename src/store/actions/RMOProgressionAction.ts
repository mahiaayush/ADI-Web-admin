import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_RMOPROGRESSION_API,
  GET_RMOPREGCARCODE_LIST_API,
  GET_RMOPROGRESSION_SUCCESS,
  GET_RMOPROGRESSION_ERROR,
  GET_RMOPREGCARCODE_LIST_SUCCESS,
  GET_RMOPREGCARCODE_LIST_ERROR,
  DELETE_RMOPROGRESSION_API,
  EXPORT_RMOPROGRESSION_API,
  IMPORT_RMOPROGRESSION_API,
  CREATE_RMOPROGRESSION_API,
  EXPORT_ALL_RMOPROGRESSION_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getRMOProgression = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RMOPROGRESSION_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getRMOProgression ------>", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_RMOPROGRESSION_SUCCESS,
          payload: res.data,
        })
      } else {
        dispatch({
          type: GET_RMOPROGRESSION_ERROR,
          payload: res.data,
        })
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getRMORegcarCodeList = (sort: any = 1, order = -1) => (dispatch) => {
  const query = queryBuilder({
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RMOPREGCARCODE_LIST_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getRMORegCodeList------>", res);

      if (res.data.isSuccess) {
        dispatch({
          type: GET_RMOPREGCARCODE_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_RMOPREGCARCODE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteRMOProgression = (progregcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_RMOPROGRESSION_API}/${progregcarId}`)
    .then((res) => {
      console.log("delete RMOProgression----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importRMOProgression = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_RMOPROGRESSION_API}`, formData)
    .then((res) => {
      console.log("importRMOProgression----------->", res);
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
const exportRMOProgression = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_RMOPROGRESSION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'RMOProgression.xlsx';
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
const exportAllRMOProgression = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_RMOPROGRESSION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllRMOProgression.xlsx';
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
const CreateRMOProgression = (regcarcode: string, progPath: number, progOrder: number) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RMOPROGRESSION_API}`, {
    RegcarCode: regcarcode,
    ProgPath: progPath,
    ProgOrder: progOrder
  }).then((res) => {
    console.log("Create RMOProgression---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditRMOProgression = (progregcarId: number, regcarcode: string, progPath: number, progOrder: number) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RMOPROGRESSION_API}/${progregcarId}`, {
    RegcarCode: regcarcode,
    ProgPath: progPath,
    ProgOrder: progOrder
  }).then((res) => {
    console.log("Edit RMOProgression---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getRMOProgression,
  getRMORegcarCodeList,
  deleteRMOProgression,
  importRMOProgression,
  exportRMOProgression,
  exportAllRMOProgression,
  CreateRMOProgression,
  EditRMOProgression
}
