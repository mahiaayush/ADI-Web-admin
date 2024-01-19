import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_COLLEGE_EVENT_API,
  GET_COLLEGE_EVENT_SUCCESS,
  GET_COLLEGE_EVENT_ERROR,
  DELETE_COLLEGE_EVENT_API,
  EXPORT_COLLEGE_EVENT_API,
  IMPORT_COLLEGE_EVENT_API,
  CREATE_COLLEGE_EVENT_API,
  EXPORT_ALL_COLLEGE_EVENT_API,
  GET_COLLEGE_EVENT_LIST_API,
  GET_COLLEGE_EVENT_LIST_SUCCESS,
  GET_COLLEGE_EVENT_LIST_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getCollegeEventListMaster = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COLLEGE_EVENT_LIST_API}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_COLLEGE_EVENT_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_COLLEGE_EVENT_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const getCollegeEventMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COLLEGE_EVENT_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("CollegeEvent data------>", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_COLLEGE_EVENT_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_COLLEGE_EVENT_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteCollegeEventMaster = (collegeEventId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_COLLEGE_EVENT_API}/${collegeEventId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importCollegeEventMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COLLEGE_EVENT_API}`, formData)
    .then((res) => {
      console.log("import collegeEvent----------->", res);
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
const exportCollegeEventMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COLLEGE_EVENT_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterCollegeEvent.xlsx';
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
const exportAllCollegeEventMaster = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_COLLEGE_EVENT_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterAllCollegeEvent.xlsx';
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
const CreateCollegeEventMaster = (collegeEventId: number, entityCollegeId: number, collegeEventHeading: string,
  status: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_COLLEGE_EVENT_API}`, {
      CollegeEventId: collegeEventId,
      EntityCollegeId: entityCollegeId,
      CollegeEventHeading: collegeEventHeading,
      Status: status
    }).then((res) => {
      console.log("Create data---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }
const EditCollegeEventMaster = (collegeEventId: number, entityCollegeId: number, collegeEventHeading: string,
  status: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_COLLEGE_EVENT_API}/${collegeEventId}`, {
      EntityCollegeId: entityCollegeId,
      CollegeEventHeading: collegeEventHeading,
      Status: status
    }).then((res) => {
      console.log("edit data---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }

export {
  getCollegeEventListMaster,
  getCollegeEventMaster,
  deleteCollegeEventMaster,
  importCollegeEventMaster,
  exportCollegeEventMaster,
  exportAllCollegeEventMaster,
  CreateCollegeEventMaster,
  EditCollegeEventMaster
}