import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_CITY_API,
  GET_CITY_SUCCESS,
  GET_CITY_ERROR,
  DELETE_CITY_API,
  EXPORT_CITY_API,
  IMPORT_CITY_API,
  CREATE_CITY_API,
  EXPORT_ALL_CITY_API,
  GET_STATEID_LIST_API,
  GET_STATEID_LIST_SUCCESS,
  GET_STATEID_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getStateIdList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_STATEID_LIST_API}`)
    .then((res) => {
      console.log("stateId List------>", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_STATEID_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_STATEID_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const getCityType = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_CITY_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("get City-------->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_CITY_SUCCESS,
          payload: res?.data,
        });
      } else {
        dispatch({
          type: GET_CITY_ERROR,
          payload: res?.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteCity = (stateCityId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_CITY_API}/${stateCityId}`)
    .then((res) => {
      console.log("delete City----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importCity = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_CITY_API}`, formData)
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
const exportCity = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_CITY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'City.xlsx';
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
const exportAllCity = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_CITY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllCity.xlsx';
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
const CreateCity = (stateId: number, cityId: number, city: string) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_CITY_API}`, {
    StateId: stateId,
    CityId: cityId,
    City: city
  }).then((res) => {
    console.log("Create CityType----->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditCity = (stateCityId: number, stateId: number, cityId: number, city: string) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_CITY_API}/${stateCityId}`, {
    StateId: stateId,
    CityId: cityId,
    City: city
  }).then((res) => {
    console.log("Edit City----->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getCityType,
  deleteCity,
  importCity,
  exportCity,
  exportAllCity,
  CreateCity,
  EditCity,
  getStateIdList
}