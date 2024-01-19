import http from "../../utils/http";
import {
  GET_PUBLISH_DETAILS_API,
  GET_PUBLISH_DETAILS_SUCCESS,
  GET_PUBLISH_DETAILS_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  EXPORT_PUBLISH_DETAILS_ALLDATA_API,
  EXPORT_PUBLISH_DETAILS_API,
  IMPORT_PUBLISH_DETAILS_API,
  POST_PUBLISH_DETAILS_SUCCESS,
  POST_PUBLISH_DETAILS_ERROR,
  PUT_PUBLISH_DETAILS_SUCCESS,
  PUT_PUBLISH_DETAILS_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getPublisherDetails = (page = 1, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PUBLISH_DETAILS_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_PUBLISH_DETAILS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PUBLISH_DETAILS_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deletePublisherDetails = (publisherId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PUBLISH_DETAILS_API}/${publisherId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportPublisherDetailsAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_PUBLISH_DETAILS_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'PublisherDetails.xlsx';
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
const exportPublisherDetails = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_PUBLISH_DETAILS_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'PublisherDetails.xlsx';
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
const importPublisherDetails = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_PUBLISH_DETAILS_API}`, fromData)
    .then((res) => {
      console.log("importCatagory", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occurred' };
    })
}

const savePublisherDetails = (PublisherDetailsData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PUBLISH_DETAILS_API}`, PublisherDetailsData)
    .then((res) => {
      console.log("savePublisherDetails", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_PUBLISH_DETAILS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_PUBLISH_DETAILS_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updatePublisherDetails = (publisherId: number, PublisherDetailsData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_PUBLISH_DETAILS_API}/${publisherId}`, PublisherDetailsData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_PUBLISH_DETAILS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_PUBLISH_DETAILS_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getPublisherDetails, deletePublisherDetails, exportPublisherDetails, importPublisherDetails, savePublisherDetails, updatePublisherDetails, exportPublisherDetailsAll }