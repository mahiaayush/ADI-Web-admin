import http from "../../utils/http";
import {
  GET_COURSE_SECTION_API,
  
  GET_COURSE_SECTION_SUCCESS,
  GET_COURSE_SECTION_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_COURSE_SECTION_LIST_API,
  GET_COURSE_SECTION_LIST_SUCCESS,
  GET_COURSE_SECTION_LIST_ERROR,
  EXPORT_COURSE_SECTION_ALLDATA_API,
  EXPORT_COURSE_SECTION_API,
  IMPORT_COURSE_SECTION_API,
  POST_COURSE_SECTION_SUCCESS,
  POST_COURSE_SECTION_ERROR,
  PUT_COURSE_SECTION_SUCCESS,
  PUT_COURSE_SECTION_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCourseSectionList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_SECTION_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_SECTION_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_SECTION_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const getCourseSection = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_SECTION_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_SECTION_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_SECTION_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const deleteCourseSection = (FaqId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_SECTION_API}/${FaqId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res.data };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCourseSectionAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_SECTION_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'CourseSection.xlsx';
    link.click();
    if (res.data) {
      return { data: res.data, error: null };
    }
    return { data: null, error: res.data.detail.message };
  }).catch(err => {
    return { data: null, error: err };  
  })
}
const exportCourseSection = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_SECTION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'CourseSection.xlsx';
          link.click();
          if (res.data) {
            return { data: res.data, error: null };
          }
          return { data: null, error: res.data.detail.message };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const importCourseSection = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COURSE_SECTION_API}`, fromData)
  .then((res) => {
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCourseSection = (CourseSectionData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_SECTION_API}`, CourseSectionData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_COURSE_SECTION_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_COURSE_SECTION_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCourseSection = (SectionId: number, CourseSectionData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_SECTION_API}/${SectionId}`, CourseSectionData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_COURSE_SECTION_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_COURSE_SECTION_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })
}

export { getCourseSectionList, getCourseSection, deleteCourseSection, exportCourseSection, importCourseSection, saveCourseSection, updateCourseSection, exportCourseSectionAll }