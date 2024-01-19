import http from "../../utils/http";
import {
  GET_COUNTRY_API,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_ERROR,
  ADMIN_DATA_API_ENDPOINT_V1,
  POST_COUNTRY_SUCCESS,
  POST_COUNTRY_ERROR,
  PUT_COUNTRY_SUCCESS,
  PUT_COUNTRY_ERROR,
  IMPORT_COUNTRY_API,
  EXPORT_COUNTRY_API,
  EXPORT_COUNTRY_ALLDATA_API,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getCountry = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COUNTRY_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_COUNTRY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_COUNTRY_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteCountry = (CountryId: string) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COUNTRY_API}/${CountryId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const exportCountryAll = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COUNTRY_ALLDATA_API}`, { responseType: 'blob' })
    .then(res => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'CountryMaster.xlsx';
      link.click();
      if (res.data.isSuccess === true) {
        return { data: res.data, error: null };
      }
      return { data: null, error: res.data.detail.message };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err };
    })
}
const exportCountry = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_COUNTRY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data)
      link.download = 'CountryMaster.xlsx';
      link.click();
      if (res.data.isSuccess === true) {
        return { data: res.data, error: null };
      }
      return { data: null, error: res.data.detail.message };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err };
    })
}
const importCountry = (fromData: any) => async (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_COUNTRY_API}`, fromData)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.message, error: res.data };
    }).catch(err => {
      console.log("erroraction", err)
      return { data: null, error: err, message: 'an Error occerd' };
    })
}

const saveCountry = (CountryData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COUNTRY_API}`, CountryData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: POST_COUNTRY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: POST_COUNTRY_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const updateCountry = (CountryId: string, CountryData: any) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_COUNTRY_API}/${CountryId}`, CountryData)
    .then((res) => {
      const { data, isSuccess, message, errorMessage } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: PUT_COUNTRY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: PUT_COUNTRY_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message: message || errorMessage };
    })
}

export { getCountry, deleteCountry, exportCountry, importCountry, saveCountry, updateCountry, exportCountryAll }