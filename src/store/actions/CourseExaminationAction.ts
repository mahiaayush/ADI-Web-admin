import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_COURSE_EXAMINATION_API,
  GET_COURSE_EXAMINATION_SUCCESS,
  GET_COURSE_EXAMINATION_ERROR,
  EXPORT_COURSE_EXAMINATION_ALLDATA_API,
  EXPORT_COURSE_EXAMINATION_API,
  IMPORT_COURSE_EXAMINATION_API,
  POST_COURSE_EXAMINATION_SUCCESS,
  POST_COURSE_EXAMINATION_ERROR,
  PUT_COURSE_EXAMINATION_SUCCESS,
  PUT_COURSE_EXAMINATION_ERROR,
  GET_EXAMINATION_LIST_API,
  GET_EXAMINATION_LIST_SUCCESS,
  GET_EXAMINATION_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getExaminationList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_EXAMINATION_LIST_API}`)
    .then((res) => {
        if (res.data.isSuccess) {
            dispatch({
                type: GET_EXAMINATION_LIST_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: GET_EXAMINATION_LIST_ERROR,
              payload: res.data,
            });
        }
    }).catch(err => {
          console.log("erroraction", err)           
    })
}
const getCourseExamination = (page = 1, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_EXAMINATION_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_EXAMINATION_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_EXAMINATION_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const deleteCourseExamination = (FaqId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_EXAMINATION_API}/${FaqId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res.data };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCourseExaminationAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_EXAMINATION_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    console.log("responce is commming", res);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'CourseExamination.xlsx';
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
const exportCourseExamination = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_EXAMINATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          console.log("responce is commming", res);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'CourseExamination.xlsx';
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
const importCourseExamination = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COURSE_EXAMINATION_API}`, fromData)
  .then((res) => {
    console.log("importCatagory", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    console.log("erroraction", err)
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCourseExamination = (CourseExaminationData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_EXAMINATION_API}`, CourseExaminationData)
      .then((res) => {
        console.log("saveCourseExamination", res.data)
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_COURSE_EXAMINATION_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_COURSE_EXAMINATION_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCourseExamination = (CourseExamId: number, CourseExaminationData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_EXAMINATION_API}/${CourseExamId}`, CourseExaminationData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_COURSE_EXAMINATION_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_COURSE_EXAMINATION_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })
}

export { getExaminationList, getCourseExamination, deleteCourseExamination, exportCourseExamination, importCourseExamination, saveCourseExamination, updateCourseExamination, exportCourseExaminationAll }