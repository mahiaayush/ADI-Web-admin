import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_OCCUPATIONEXPENSES_API,
  GET_OCCUPATIONEXPENSES_SUCCESS,
  GET_OCCUPATIONEXPENSES_ERROR,
  DELETE_OCCUPATIONEXPENSES_API,
  EXPORT_OCCUPATIONEXPENSES_API,
  IMPORT_OCCUPATIONEXPENSES_API,
  CREATE_OCCUPATIONEXPENSES_API,
  EXPORT_ALL_OCCUPATIONEXPENSES_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getOccupationExpenses = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATIONEXPENSES_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("OcupExpenseData------>", res);

      if (res.data.isSuccess) {
        dispatch({
          type: GET_OCCUPATIONEXPENSES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_OCCUPATIONEXPENSES_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteOccupationExpenses = (expregcarId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_OCCUPATIONEXPENSES_API}/${expregcarId}`)
    .then((res) => {
      console.log("delete OCCUPATIONEXPENSES----->", res);
      if (res.data.status === true) {
        return { ...res, error: null };
      }
      return { data: res.data, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importOccupationExpenses = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_OCCUPATIONEXPENSES_API}`, formData)
    .then((res) => {
      console.log("import Occupation Expenses----------->", res);
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
const exportOcupationExpenses = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
   page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATIONEXPENSES_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'OcupationExpenses.xlsx';
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
const exportAllOcupationExpenses = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_OCCUPATIONEXPENSES_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllOcupationExpenses.xlsx';
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
const CreateOccupationExpenses = (regcarCode: string, expregcarFn: string, expregcarVal: number) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATIONEXPENSES_API}`, {
    RegcarCode: regcarCode,
    ExpregcarFn: expregcarFn,
    ExpregcarVal: expregcarVal
  }).then((res) => {
    console.log("Create OCCUPATIONEXPENSES---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}
const EditOccupationExpenses = (expregcarId: number, regcarCode: string, expregcarFn: string, expregcarVal: number) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATIONEXPENSES_API}/${expregcarId}`, {
    RegcarCode: regcarCode,
    ExpregcarFn: expregcarFn,
    ExpregcarVal: expregcarVal
  }).then((res) => {
    console.log("Edit OCCUPATIONEXPENSES---->", res);
    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

export {
  getOccupationExpenses,
  deleteOccupationExpenses,
  importOccupationExpenses,
  exportOcupationExpenses,
  exportAllOcupationExpenses,
  CreateOccupationExpenses,
  EditOccupationExpenses
}
