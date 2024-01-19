import http from "../../utils/http";
import {
  GET_COURSE_ASSET_API,
  GET_COURSE_ASSET_SUCCESS,
  GET_COURSE_ASSET_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  EXPORT_COURSE_ASSET_ALLDATA_API,
  EXPORT_COURSE_ASSET_API,
  IMPORT_COURSE_ASSET_API,
  POST_COURSE_ASSET_SUCCESS,
  POST_COURSE_ASSET_ERROR,
  PUT_COURSE_ASSET_SUCCESS,
  PUT_COURSE_ASSET_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCourseAsset = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_ASSET_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_COURSE_ASSET_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_COURSE_ASSET_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const deleteCourseAsset = (courseAssetId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_ASSET_API}/${courseAssetId}`)
        .then((res) => {
          if (res.data.isSuccess === true) {
            return { ...res, error: null };
          }
          return { data: null, error: res };
        }).catch(err => {
          return { data: null, error: err };             
        })
}
const exportCourseAssetAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_ASSET_ALLDATA_API}`, { responseType: 'blob' })
  .then(res => {
    console.log("responce is commming", res);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(res.data)
    link.download = 'courseAsset.xlsx';
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
const exportCourseAsset = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COURSE_ASSET_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
          console.log("responce is commming", res);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(res.data)
          link.download = 'courseAsset.xlsx';
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
const importCourseAsset = (fromData: any) => async (dispatch) => {
   return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COURSE_ASSET_API}`, fromData)
  .then((res) => {
    console.log("importCourseAsset", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.message, error: res.data };
  }).catch(err => {
    console.log("erroraction", err)
    return { data: null, error: err, message: 'an Error occerd' };             
  })
}

const saveCourseAsset = (CourseAssetData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_ASSET_API}`, CourseAssetData)
      .then((res) => {
        console.log("saveCourseAsset", res.data)
        const { data, isSuccess, message, errorMessage } = res.data;
          if (res.data.isSuccess) {
              dispatch({
                  type: POST_COURSE_ASSET_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: POST_COURSE_ASSET_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
      }).catch(err => {
            console.log("erroraction", err)           
      })
}

const updateCourseAsset = (courseAssetId: number, CourseFaqData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COURSE_ASSET_API}/${courseAssetId}`, CourseFaqData)
      .then((res) => {
        const { data, isSuccess, message, errorMessage } = res.data;
        console.log("res.data", res.data);
        if (res.data.isSuccess) {
            dispatch({
                type: PUT_COURSE_ASSET_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: PUT_COURSE_ASSET_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
      })
}
export { getCourseAsset, deleteCourseAsset, exportCourseAsset, importCourseAsset, saveCourseAsset, updateCourseAsset, exportCourseAssetAll }