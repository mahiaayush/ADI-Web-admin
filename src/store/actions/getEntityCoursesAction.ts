import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ENTITYCOURSES_API,
  GET_ENTITYCOURSES_SUCCESS,
  GET_ENTITYCOURSES_ERROR,
  DELETE_ENTITYCOURSES_API,
  EXPORT_ENTITYCOURSES_API,
  IMPORT_ENTITYCOURSES_API,
  CREATE_ENTITYCOURSES_API,
  EXPORT_ALL_ENTITYCOURSES_API,
  GET_COURSEMODE_LIST_API,
  GET_COURSEMODE_LIST_SUCCESS,
  GET_COURSEMODE_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getCourseModeListApi = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSEMODE_LIST_API}`)
    .then((res) => {
      console.log("Course Mode list----->", res);
      if (res.data.status) {
        dispatch({
          type: GET_COURSEMODE_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COURSEMODE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getEntityCourses = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ENTITYCOURSES_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Get Entity Courses----->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ENTITYCOURSES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ENTITYCOURSES_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteEntityCourses = (entitycourseId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_ENTITYCOURSES_API}/${entitycourseId}`)
    .then((res) => {
      console.log("delete EntityCourses----------->", res);
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importEntityCourses = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ENTITYCOURSES_API}`, formData)
    .then((res) => {
      console.log("import entitycourses----------->", res);
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
const exportEntityCourses = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ENTITYCOURSES_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'EntityCourses.xlsx';
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
const exportAllEntityCourses = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_ENTITYCOURSES_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllEntityCourses.xlsx';
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
const CreateEntityCourses = (entityId: string, courseId: number,
  courseFee: string, coursemodeId: number, admissionCriteria: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ENTITYCOURSES_API}`, {
      EntityId: entityId,
      CourseId: courseId,
      CourseFee: courseFee,
      CoursemodeId: coursemodeId,
      AdmissionCriteria: admissionCriteria
    }).then((res) => {
      console.log("Create Entity Course---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage || res.data.message, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }
const EditEntityCourses = (entitycourseId: number, entityId: string, courseId: number,
  courseFee: string, coursemodeId: number, admissionCriteria: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ENTITYCOURSES_API}/${entitycourseId}`, {
      EntityId: entityId,
      CourseId: courseId,
      CourseFee: courseFee,
      CoursemodeId: coursemodeId,
      AdmissionCriteria: admissionCriteria
    }).then((res) => {
      console.log("Edit data---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage || res.data.message, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }

export {
  getEntityCourses,
  deleteEntityCourses,
  importEntityCourses,
  exportEntityCourses,
  exportAllEntityCourses,
  CreateEntityCourses,
  EditEntityCourses,
  getCourseModeListApi
}