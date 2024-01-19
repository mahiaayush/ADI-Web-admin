import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_EXAMTYPE_API,
  GET_EXAMTYPE_SUCCESS,
  GET_EXAMTYPE_ERROR,
  DELETE_EXAMTYPE_API,
  EXPORT_EXAMTYPE_API,
  IMPORT_EXAMTYPE_API,
  CREATE_EXAMTYPE_API,
  EXPORT_ALL_EXAMTYPE_API,
  GET_EXAMTYPE_LIST_API,
  GET_EXAMTYPE_LIST_SUCCESS,
  GET_EXAMTYPE_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getExamTypeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_EXAMTYPE_LIST_API}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_EXAMTYPE_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_EXAMTYPE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getExamTypeMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });

  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_EXAMTYPE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_EXAMTYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_EXAMTYPE_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const importExamTypeMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_EXAMTYPE_API}`, formData)
    .then((res) => {
      console.log("import collegeEvent----------->", res);
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
const exportExamTypeMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_EXAMTYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterExamType.xlsx';
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
const exportAllExamTypeMaster = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_EXAMTYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterAllExamType.xlsx';
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
const deleteExamTypeMaster = (examTypeId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_EXAMTYPE_API}/${examTypeId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const CreateExamTypeMaster = (examTypeName: string) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_EXAMTYPE_API}`, {
    ExamTypeName: examTypeName
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
const EditExamTypeMaster = (examTypeId: number, examTypeName: string) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_EXAMTYPE_API}/${examTypeId}`, {
    ExamTypeName: examTypeName
  }).then((res) => {
    console.log("edit data---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getExamTypeMaster,
  importExamTypeMaster,
  exportExamTypeMaster,
  exportAllExamTypeMaster,
  deleteExamTypeMaster,
  CreateExamTypeMaster,
  EditExamTypeMaster,
  getExamTypeList
}