import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ACCOMODATIONTYPE_API,
  GET_ACCOMODATIONTYPE_SUCCESS,
  GET_ACCOMODATIONTYPE_ERROR,
  DELETE_ACCOMODATIONTYPE_API,
  EXPORT_ACCOMODATIONTYPE_API,
  IMPORT_ACCOMODATIONTYPE_API,
  CREATE_ACCOMODATIONTYPE_API,
  EXPORT_ALL_ACCOMODATIONTYPE_API,
  GET_ACCOMODATION_TYPE_LIST,
  GET_ACCOMODATION_TYPE_LIST_SUCCESS,
  GET_ACCOMODATION_TYPE_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getAccomodationTypeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCOMODATION_TYPE_LIST}`)
    .then((res) => {
      const { data, isSuccess, message } = res.data;
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACCOMODATION_TYPE_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ACCOMODATION_TYPE_LIST_ERROR,
          payload: res.data,
        });
      }
      return { isSuccess, message };
    })
}
const getAccomodationType = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCOMODATIONTYPE_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getAccomodationType------>", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACCOMODATIONTYPE_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ACCOMODATIONTYPE_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteAccomodationType = (amTypeId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_ACCOMODATIONTYPE_API}/${amTypeId}`)
    .then((res) => {
      console.log("delete AccomodationType----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importAccomodationType = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ACCOMODATIONTYPE_API}`, formData)
    .then((res) => {
      console.log("importAccomodationType----------->", res);
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
const exportAccomodationType = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACCOMODATIONTYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AccomodationType.xlsx';
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
const exportAllAccomodationType = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_ACCOMODATIONTYPE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllAccomodationType.xlsx';
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
const CreateAccomodationType = (amtypeName: string) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ACCOMODATIONTYPE_API}`, {
    AmtypeName: amtypeName
  }).then((res) => {
    console.log("Create AccomodationType---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditAccomodationType = (amTypeId: number, amtypeName: string) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ACCOMODATIONTYPE_API}/${amTypeId}`, {
    AmtypeName: amtypeName
  }).then((res) => {
    console.log("Edit AccomodationType---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getAccomodationTypeList,
  getAccomodationType,
  deleteAccomodationType,
  importAccomodationType,
  exportAccomodationType,
  exportAllAccomodationType,
  CreateAccomodationType,
  EditAccomodationType
}
