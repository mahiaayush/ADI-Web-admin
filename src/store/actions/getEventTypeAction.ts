import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_EVENTTYPE_API,
  GET_EVENTTYPE_SUCCESS,
  GET_EVENTTYPE_ERROR,
  GET_EVENTTYPE_LIST_API,
  GET_EVENTTYPE_LIST_SUCCESS,
  GET_EVENTTYPE_LIST_ERROR,
  DELETE_EVENTTYPE_API,
  EXPORT_EVENTTYPE_API,
  IMPORT_EVENTTYPE_API,
  CREATE_EVENTTYPE_API,
  EXPORT_ALL_EVENTTYPE_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getEventTypeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_EVENTTYPE_LIST_API}`)
    .then((res) => {
      if (res.data.status) {
        dispatch({
          type: GET_EVENTTYPE_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_EVENTTYPE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getEventType = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_EVENTTYPE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Get Entity course-------->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_EVENTTYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_EVENTTYPE_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteEventType = (eventtypeId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_EVENTTYPE_API}/${eventtypeId}`)
    .then((res) => {
      console.log("delete deleteEventType----------->", res);
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importEventType = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_EVENTTYPE_API}`, formData)
    .then((res) => {
      console.log("import eventType----------->", res);
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
const exportEventType = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_EVENTTYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'EventType.xlsx';
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
const exportAllEventType = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_EVENTTYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllEventType.xlsx';
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
const CreateEventType = (eventtypeName: string) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_EVENTTYPE_API}`, {
    EventtypeName: eventtypeName
  }).then((res) => {
    console.log("Create Event Type----->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditEventType = (eventtypeId: number, eventtypeName: string) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_EVENTTYPE_API}/${eventtypeId}`, {
    EventtypeId: eventtypeId,
    EventtypeName: eventtypeName
  }).then((res) => {
    console.log("Edit Event Type----->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
export {
  getEventTypeList,
  getEventType,
  deleteEventType,
  importEventType,
  exportEventType,
  exportAllEventType,
  CreateEventType,
  EditEventType
}