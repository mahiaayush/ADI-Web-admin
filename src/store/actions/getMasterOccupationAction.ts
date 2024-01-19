import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_OCCUPATION_API,
  GET_OCCUPATION_SUCCESS,
  GET_OCCUPATION_ERROR,
  DELETE_OCCUPATION_API,
  EXPORT_OCCUPATION_API,
  IMPORT_OCCUPATION_API,
  CREATE_OCCUPATION_API,
  EXPORT_ALL_OCCUPATION_API,
  GET_OCCUPATION_LIST_API,
  GET_OCCUPATION_LIST_SUCCESS,
  GET_OCCUPATION_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getOccupationMasterList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATION_LIST_API}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_OCCUPATION_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_OCCUPATION_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const getOccupationMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });

  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATION_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_OCCUPATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_OCCUPATION_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteOccupationMaster = (onetsocCode: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_OCCUPATION_API}/${onetsocCode}`)
    .then((res) => {
      console.log("delete Occupation----------->", res);
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res?.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const importOccupationMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_OCCUPATION_API}`, formData)
    .then((res) => {
      console.log("import Occupation----------->", res);
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
const exportOccupationMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterOccupation.xlsx';
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
const exportAllOccupationMaster = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_OCCUPATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterAllOccupation.xlsx';
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
const CreateOccupationMaster = (onetsocCode: string, onetsocTitle: string, onetsocDesc: string) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATION_API}`, {
    OnetsocCode: onetsocCode,
    OnetsocTitle: onetsocTitle,
    OnetsocDesc: onetsocDesc
  }).then((res) => {
    const { data, isSuccess, message, errorMessage } = res.data;
    console.log("Create data---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: message || errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditOccupationMaster = (onetsocCode: string, onetsocTitle: string, onetsocDesc: string) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATION_API}/${onetsocCode}`, {
    OnetsocTitle: onetsocTitle,
    OnetsocDesc: onetsocDesc
  }).then((res) => {
    console.log("Edit data---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getOccupationMaster,
  getOccupationMasterList,
  deleteOccupationMaster,
  importOccupationMaster,
  exportOccupationMaster,
  exportAllOccupationMaster,
  CreateOccupationMaster,
  EditOccupationMaster
}