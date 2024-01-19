import http from "../../utils/http";
import {
  GET_COURSE_DETAILS_API,
  GET_COURSE_DETAILS_SUCCESS,
  GET_COURSE_DETAILS_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  POST_COURSE_DETAILS_SUCCESS,
  POST_COURSE_DETAILS_ERROR,
  PUT_COURSE_DETAILS_SUCCESS,
  PUT_COURSE_DETAILS_ERROR,
  IMPORT_COURSE_DETAILS_API,
  EXPORT_COURSE_DETAILS_API,
  EXPORT_COURSE_DETAILS_ALLDATA_API,

  GET_PUBLISH_DETAILS_LIST_API,
  GET_PUBLISH_DETAILS_LIST_SUCCESS,
  GET_PUBLISH_DETAILS_LIST_ERROR,
  
  GET_ITEM_MASTER_LIST_API,
  GET_ITEM_MASTER_LIST_SUCCESS,
  GET_ITEM_MASTER_LIST_ERROR,

  GET_TOPIC_MASTER_LIST_API,
  GET_TOPIC_MASTER_LIST_SUCCESS,
  GET_TOPIC_MASTER_LIST_ERROR,

  GET_COURSE_TYPE_LIST_API,
  GET_COURSE_TYPE_LIST_SUCCESS,
  GET_COURSE_TYPE_LIST_ERROR,

  GET_COURSE_LEVEL_LIST_API,
  GET_COURSE_LEVEL_LIST_SUCCESS,
  GET_COURSE_LEVEL_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCourseDetails = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_DETAILS_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_DETAILS_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_DETAILS_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const deleteCourseDetails = (DETAILSId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_DETAILS_API}/${DETAILSId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res?.data };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCourseDetailsAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_DETAILS_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    console.log("responce is commming", res);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'courseDetails.xlsx';
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
const exportCourseDetails = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_DETAILS_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          console.log("responce is commming", res);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'courseDetails.xlsx';
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
const importCourseDetails = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COURSE_DETAILS_API}`, fromData)
  .then((res) => {
    console.log("importCourseDetails", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    console.log("erroraction", err)
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCourseDetails = (CourseDetailSData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_DETAILS_API}`, CourseDetailSData)
      .then((res) => {
        console.log("saveCourseDetails", res.data)
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_COURSE_DETAILS_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_COURSE_DETAILS_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCourseDetails = (CourseId: number, CourseDetailSData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_DETAILS_API}/${CourseId}`, CourseDetailSData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        console.log("res.data", res.data);
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_COURSE_DETAILS_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_COURSE_DETAILS_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })     
}

const getPublishDetailsList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PUBLISH_DETAILS_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_PUBLISH_DETAILS_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_PUBLISH_DETAILS_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const getItemMasterList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ITEM_MASTER_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_ITEM_MASTER_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_ITEM_MASTER_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const getTopicList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_TOPIC_MASTER_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_TOPIC_MASTER_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_TOPIC_MASTER_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

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

const getCourseLevelList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_LEVEL_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_LEVEL_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_LEVEL_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

export { 
  getCourseDetails, 
  deleteCourseDetails, 
  exportCourseDetails, 
  importCourseDetails, 
  saveCourseDetails, 
  updateCourseDetails, 
  exportCourseDetailsAll,
  getPublishDetailsList,
  getItemMasterList,
  getTopicList,
  getCourseLevelList
 }