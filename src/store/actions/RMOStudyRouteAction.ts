import http from "../../utils/http";
import {
  GET_STUDY_ROUTE_API,
  GET_STUDY_ROUTE_SUCCESS,
  GET_STUDY_ROUTE_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  EXPORT_STUDY_ROUTE_ALLDATA_API,
  EXPORT_STUDY_ROUTE_API,
  IMPORT_STUDY_ROUTE_API,
  POST_STUDY_ROUTE_SUCCESS,
  POST_STUDY_ROUTE_ERROR,
  PUT_STUDY_ROUTE_SUCCESS,
  PUT_STUDY_ROUTE_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getStudyRoute = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_STUDY_ROUTE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_STUDY_ROUTE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_STUDY_ROUTE_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteStudyRoute = (SrregcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_STUDY_ROUTE_API}/${SrregcarId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportStudyRouteAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_STUDY_ROUTE_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'StudyRoute.xlsx';
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
const exportStudyRoute = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_STUDY_ROUTE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'StudyRoute.xlsx';
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
const importStudyRoute = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_STUDY_ROUTE_API}`, fromData)
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

const saveStudyRoute = (StudyRouteData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_STUDY_ROUTE_API}`, StudyRouteData)
    .then((res) => {
      console.log("saveStudyRoute", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_STUDY_ROUTE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_STUDY_ROUTE_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateStudyRoute = (SrregcarId: number, StudyRouteData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_STUDY_ROUTE_API}/${SrregcarId}`, StudyRouteData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_STUDY_ROUTE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_STUDY_ROUTE_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getStudyRoute, deleteStudyRoute, exportStudyRoute, importStudyRoute, saveStudyRoute, updateStudyRoute, exportStudyRouteAll }