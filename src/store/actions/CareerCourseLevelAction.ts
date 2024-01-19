import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_CAREER_COURSE_LEVEL_LIST_API,
  GET_CAREER_COURSE_LEVEL_LIST_SUCCESS,
  GET_CAREER_COURSE_LEVEL_LIST_ERROR,
  GET_CAREER_COURSE_LEVEL_API,
  GET_CAREER_COURSE_LEVEL_SUCCESS,
  GET_CAREER_COURSE_LEVEL_ERROR,
  EXPORT_CAREER_COURSE_LEVEL_ALLDATA_API,
  EXPORT_CAREER_COURSE_LEVEL_API,
  IMPORT_CAREER_COURSE_LEVEL_API,
  POST_CAREER_COURSE_LEVEL_SUCCESS,
  POST_CAREER_COURSE_LEVEL_ERROR,
  PUT_CAREER_COURSE_LEVEL_SUCCESS,
  PUT_CAREER_COURSE_LEVEL_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCareerCourseLevelList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CAREER_COURSE_LEVEL_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_CAREER_COURSE_LEVEL_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_CAREER_COURSE_LEVEL_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}
const getCareerCourseLevel = (page = 1, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CAREER_COURSE_LEVEL_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_CAREER_COURSE_LEVEL_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_CAREER_COURSE_LEVEL_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const deleteCareerCourseLevel = (SubjectId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CAREER_COURSE_LEVEL_API}/${SubjectId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res.data };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCareerCourseLevelAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CAREER_COURSE_LEVEL_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    console.log("responce is commming", res);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'CareerCourseLevel.xlsx';
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
const exportCareerCourseLevel = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CAREER_COURSE_LEVEL_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          console.log("responce is commming", res);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'CareerCourseLevel.xlsx';
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
const importCareerCourseLevel = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_CAREER_COURSE_LEVEL_API}`, fromData)
  .then((res) => {
    console.log("importCareerCourseLevel", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    console.log("erroraction", err)
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCareerCourseLevel = (CareerCourseLeveleData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CAREER_COURSE_LEVEL_API}`, CareerCourseLeveleData)
      .then((res) => {
        console.log("saveCareerCourseLevel", res.data)
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_CAREER_COURSE_LEVEL_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_CAREER_COURSE_LEVEL_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCareerCourseLevel = (affiliationId: number, CareerCourseLeveleData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CAREER_COURSE_LEVEL_API}/${affiliationId}`, CareerCourseLeveleData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        console.log("res.data", res.data);
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_CAREER_COURSE_LEVEL_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_CAREER_COURSE_LEVEL_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })
}

export { getCareerCourseLevelList, getCareerCourseLevel, deleteCareerCourseLevel, exportCareerCourseLevel, importCareerCourseLevel, saveCareerCourseLevel, updateCareerCourseLevel, exportCareerCourseLevelAll }