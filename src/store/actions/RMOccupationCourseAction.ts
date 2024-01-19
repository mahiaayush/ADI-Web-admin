import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_OCCUPATIONCOURSE_API,
  GET_OCCUPATIONCOURSE_SUCCESS,
  GET_OCCUPATIONCOURSE_ERROR,
  DELETE_OCCUPATIONCOURSE_API,
  EXPORT_OCCUPATIONCOURSE_API,
  IMPORT_OCCUPATIONCOURSE_API,
  CREATE_OCCUPATIONCOURSE_API,
  EXPORT_ALL_OCCUPATIONCOURSE_API,
  PUT_OCCUPATIONCOURSE_ERROR,
  PUT_COURSE_SECTION_SUCCESS,
  POST_OCCUPATIONCOURSE_SUCCESS,
  POST_OCCUPATIONCOURSE_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getOccupationCourse = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATIONCOURSE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getOccupationCourse------>", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_OCCUPATIONCOURSE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_OCCUPATIONCOURSE_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteOccupatioCourse = (courseRegcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_OCCUPATIONCOURSE_API}/${courseRegcarId}`)
    .then((res) => {
      console.log("delete OCCUPATIONCOURSE----->", res);
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const saveOccupationCourse = (OccupationCourseData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATIONCOURSE_API}`, OccupationCourseData)
    .then((res) => {
      console.log("saveOccupationCourse", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_OCCUPATIONCOURSE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_OCCUPATIONCOURSE_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const updateOccupationCourse = (CourseRegcarId: number, OccupationCourseData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATIONCOURSE_API}/${CourseRegcarId}`, OccupationCourseData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_COURSE_SECTION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_OCCUPATIONCOURSE_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

const importOccupationCourse = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_OCCUPATIONCOURSE_API}`, formData)
    .then((res) => {
      console.log("import Occupation Course----------->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, error: res.data };
    })
    .catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: err };
    })
}

const exportOcupationCourse = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATIONCOURSE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'OcupationCourse.xlsx';
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
const exportAllOcupationCourse = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_OCCUPATIONCOURSE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllOcupationCourse.xlsx';
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
export {
  getOccupationCourse,
  deleteOccupatioCourse,
  saveOccupationCourse,
  updateOccupationCourse,
  importOccupationCourse,
  exportOcupationCourse,
  exportAllOcupationCourse
}