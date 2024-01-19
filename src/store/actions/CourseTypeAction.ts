import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_COURSE_TYPE_LIST_API,
  GET_COURSE_TYPE_LIST_SUCCESS,
  GET_COURSE_TYPE_LIST_ERROR,
  GET_COURSE_TYPE_API,
  GET_COURSE_TYPE_SUCCESS,
  GET_COURSE_TYPE_ERROR,
  EXPORT_COURSE_TYPE_ALLDATA_API,
  EXPORT_COURSE_TYPE_API,
  IMPORT_COURSE_TYPE_API,
  POST_COURSE_TYPE_SUCCESS,
  POST_COURSE_TYPE_ERROR,
  PUT_COURSE_TYPE_SUCCESS,
  PUT_COURSE_TYPE_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCourseTypeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_TYPE_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_TYPE_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_TYPE_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}
const getCourseType = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_TYPE_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_TYPE_SUCCESS,
                    payload: res?.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_TYPE_ERROR,
                  payload: res?.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const deleteCourseType = (SubjectId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_TYPE_API}/${SubjectId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res.data };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCourseTypeAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_TYPE_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'CourseType.xlsx';
    link.click();
    if (res.data) {
      return { data: res.data, error: null };
    }
    return { data: null, error: res.data.detail.message };
  }).catch(err => {
    return { data: null, error: err };  
  })
}
const exportCourseType = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_TYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'CourseType.xlsx';
          link.click();
          if (res.data) {
            return { data: res.data, error: null };
          }
          return { data: null, error: res.data.detail.message };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const importCourseType = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COURSE_TYPE_API}`, fromData)
  .then((res) => {
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCourseType = (CourseTypeeData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_TYPE_API}`, CourseTypeeData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_COURSE_TYPE_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_COURSE_TYPE_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCourseType = (affiliationId: number, CourseTypeeData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_TYPE_API}/${affiliationId}`, CourseTypeeData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_COURSE_TYPE_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_COURSE_TYPE_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })
}

export { getCourseTypeList, getCourseType, deleteCourseType, exportCourseType, importCourseType, saveCourseType, updateCourseType, exportCourseTypeAll }