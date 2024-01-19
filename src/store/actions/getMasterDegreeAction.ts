import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_MASTERDEGREE_API,
  GET_MASTERDEGREE_SUCCESS,
  GET_MASTERDEGREE_ERROR,
  DELETE_MASTERDEGREE_API,
  EXPORT_MASTERDEGREE_API,
  IMPORT_MASTERDEGREE_API,
  CREATE_MASTERDEGREE_API,
  EXPORT_ALL_MASTERDEGREE_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getDegreeMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });

  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTERDEGREE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Degree data---->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_MASTERDEGREE_SUCCESS,
          payload: res?.data,
        });
      } else {
        dispatch({
          type: GET_MASTERDEGREE_ERROR,
          payload: res?.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteDegreeMaster = (degreeId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_MASTERDEGREE_API}/${degreeId}`)
    .then((res) => {
      console.log("delete Occupation----------->", res);
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importDegreeMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_MASTERDEGREE_API}`, formData)
    .then((res) => {
      console.log("import Degree----------->", res);
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
const exportDegreeMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_MASTERDEGREE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterDegree.xlsx';
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
const exportAllDegreeMaster = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_MASTERDEGREE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterAllDegree.xlsx';
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
const CreateDegreeMaster = (degreeName: string, isDeleted: number) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_MASTERDEGREE_API}`, {
    DegreeName: degreeName,
    IsDeleted: isDeleted,
  }).then((res) => {
    console.log("Create data---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditDegreeMaster = (degreeId: number, degreeName: string, isDeleted: number) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_MASTERDEGREE_API}/${degreeId}`, {
    DegreeName: degreeName,
    IsDeleted: isDeleted,
  }).then((res) => {
    console.log("Create data---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getDegreeMaster,
  deleteDegreeMaster,
  importDegreeMaster,
  exportDegreeMaster,
  exportAllDegreeMaster,
  CreateDegreeMaster,
  EditDegreeMaster
}
