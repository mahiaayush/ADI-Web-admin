import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_OCCUPATIONEXAM_API,
  GET_OCCUPATIONEXAM_SUCCESS,
  GET_OCCUPATIONEXAM_ERROR,
  DELETE_OCCUPATIONEXAM_API,
  EXPORT_OCCUPATIONEXAM_API,
  IMPORT_OCCUPATIONEXAM_API,
  CREATE_OCCUPATIONEXAM_API,
  EXPORT_ALL_OCCUPATIONEXAM_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getOccupationExam = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATIONEXAM_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Occupation Exam-------->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_OCCUPATIONEXAM_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_OCCUPATIONEXAM_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteOccupationExam = (examregcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_OCCUPATIONEXAM_API}/${examregcarId}`)
    .then((res) => {
      console.log("delete OccupationExam----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importOccupationExam = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_OCCUPATIONEXAM_API}`, formData)
    .then((res) => {
      console.log("import Occupation Exam----------->", res);
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
const exportOcupationExam = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATIONEXAM_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'OcupationExam.xlsx';
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
const exportAllOcupationExam = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_OCCUPATIONEXAM_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllOcupationExam.xlsx';
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
const CreateOccupationExam = (regcarCode: string, examId: number) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATIONEXAM_API}`, {
    RegcarCode: regcarCode,
    ExamId: examId
  }).then((res) => {
    console.log("Create OccupationExam---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditOccupationExam = (examregcarId: number, regcarCode: string, examId: number) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATIONEXAM_API}/${examregcarId}`, {
    RegcarCode: regcarCode,
    ExamId: examId
  }).then((res) => {
    console.log("Edit OccupationExam---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getOccupationExam,
  deleteOccupationExam,
  importOccupationExam,
  exportOcupationExam,
  exportAllOcupationExam,
  CreateOccupationExam,
  EditOccupationExam
}
