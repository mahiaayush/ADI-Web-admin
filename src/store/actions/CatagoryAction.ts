import http from "../../utils/http";
import {
  GET_CATAGORY_API,
  GET_CATAGORY_SUCCESS,
  GET_CATAGORY_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  EXPORT_CATAGORY_ALLDATA_API,
  EXPORT_CATAGORY_API,
  IMPORT_CATAGORY_API,
  POST_CATAGORY_SUCCESS,
  POST_CATAGORY_ERROR,
  PUT_CATAGORY_SUCCESS,
  PUT_CATAGORY_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCatagory = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CATAGORY_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_CATAGORY_SUCCESS,
          payload: res?.data,
        });
      } else {
        dispatch({
          type: GET_CATAGORY_ERROR,
          payload: res?.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteCatagory = (FaqId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CATAGORY_API}/${FaqId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportCatagoryAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CATAGORY_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'Catagory.xlsx';
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
const exportCatagory = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CATAGORY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      console.log("responce is commming", res);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'Catagory.xlsx';
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
const importCatagory = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_CATAGORY_API}`, fromData)
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

const saveCatagory = (CatagoryData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CATAGORY_API}`, CatagoryData)
    .then((res) => {
      console.log("saveCatagory", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_CATAGORY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_CATAGORY_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateCatagory = (CategoryId: number, CatagoryData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CATAGORY_API}/${CategoryId}`, CatagoryData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      console.log("res.data", res.data);
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_CATAGORY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_CATAGORY_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getCatagory, deleteCatagory, exportCatagory, importCatagory, saveCatagory, updateCatagory, exportCatagoryAll }