import http from "../../utils/http";
import {
  GET_COURSE_FAQ_API,
  GET_COURSE_FAQ_SUCCESS,
  GET_COURSE_FAQ_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  POST_COURSE_FAQ_SUCCESS,
  POST_COURSE_FAQ_ERROR,
  PUT_COURSE_FAQ_SUCCESS,
  PUT_COURSE_FAQ_ERROR,
  IMPORT_COURSE_FAQ_API,
  EXPORT_COURSE_FAQ_API,
  EXPORT_COURSE_FAQ_ALLDATA_API,
  GET_COURSE_LIST_API,
  GET_COURSE_LIST_SUCCESS,
  GET_COURSE_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCourseFaq = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_FAQ_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_FAQ_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_FAQ_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("error action", err)           
        })
}

const deleteCourseFaq = (FaqId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_FAQ_API}/${FaqId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCourseFaqAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_FAQ_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'courseFaq.xlsx';
    link.click();
    if (res.data) {
      return { data: res.data, error: null };
    }
    return { data: null, error: res.data.detail.message };
  }).catch(err => {
    return { data: null, error: err };  
  })
}
const exportCourseFaq = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_FAQ_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'courseFaq.xlsx';
          link.click();
          if (res.data) {
            return { data: res.data, error: null };
          }
          return { data: null, error: res.data.detail.message };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const importCourseFaq = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COURSE_FAQ_API}`, fromData)
  .then((res) => {
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCourseFaq = (CourseFaqData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_FAQ_API}`, CourseFaqData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_COURSE_FAQ_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_COURSE_FAQ_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCourseFaq = (FaqId: number, CourseFaqData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_FAQ_API}/${FaqId}`, CourseFaqData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_COURSE_FAQ_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_COURSE_FAQ_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })
}
const getCourseList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_LIST_API}`)
  .then((res) => {
      if (res.data.isSuccess) {
          dispatch({
              type: GET_COURSE_LIST_SUCCESS,
              payload: res.data,
            });
      } else {
          dispatch({
            type: GET_COURSE_LIST_ERROR,
            payload: res.data,
          });
      }
  }).catch(err => {
        console.log("erroraction", err)           
  })
}
export { getCourseFaq, deleteCourseFaq, exportCourseFaq, importCourseFaq, saveCourseFaq, updateCourseFaq, exportCourseFaqAll, getCourseList }