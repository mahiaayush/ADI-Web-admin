import http from "../../utils/http";
import {
  GET_CONTENT_TYPE_API,
  GET_CONTENT_TYPE_SUCCESS,
  GET_CONTENT_TYPE_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_CONTENT_TYPE_LIST_API,
  GET_CONTENT_TYPE_LIST_SUCCESS,
  GET_CONTENT_TYPE_LIST_ERROR,
  // contenttype-list
  EXPORT_CONTENT_TYPE_ALLDATA_API,
  EXPORT_CONTENT_TYPE_API,
  IMPORT_CONTENT_TYPE_API,
  POST_CONTENT_TYPE_SUCCESS,
  POST_CONTENT_TYPE_ERROR,
  PUT_CONTENT_TYPE_SUCCESS,
  PUT_CONTENT_TYPE_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getContentTypeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CONTENT_TYPE_LIST_API}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_CONTENT_TYPE_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_CONTENT_TYPE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const getContentType = (page = 1, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CONTENT_TYPE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_CONTENT_TYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_CONTENT_TYPE_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteContentType = (FaqId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CONTENT_TYPE_API}/${FaqId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportContentTypeAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CONTENT_TYPE_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'ContentType.xlsx';
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
const exportContentType = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CONTENT_TYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'ContentType.xlsx';
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
const importContentType = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_CONTENT_TYPE_API}`, fromData)
    .then((res) => {
      console.log("importContentType", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}

const saveContentType = (ContentTypeData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CONTENT_TYPE_API}`, ContentTypeData)
    .then((res) => {
      console.log("saveContentType", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_CONTENT_TYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_CONTENT_TYPE_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateContentType = (FaqId: number, ContentTypeData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CONTENT_TYPE_API}/${FaqId}`, ContentTypeData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_CONTENT_TYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_CONTENT_TYPE_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getContentTypeList, getContentType, deleteContentType, exportContentType, importContentType, saveContentType, updateContentType, exportContentTypeAll }