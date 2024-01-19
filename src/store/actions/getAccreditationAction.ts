import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ACCREDITATION_API,
  GET_ACCREDITATION_SUCCESS,
  GET_ACCREDITATION_ERROR,
  DELETE_ACCREDITATION_API,
  EXPORT_ACCREDITATION_API,
  IMPORT_ACCREDITATION_API,
  CREATE_ACCREDITATION_API,
  EXPORT_ALL_ACCREDITATION_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getAccreditationMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });

  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ACCREDITATION_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ACCREDITATION_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ACCREDITATION_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteAccreditationMaster = (entityaccrId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_ACCREDITATION_API}/${entityaccrId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const importAccreditationMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ACCREDITATION_API}`, formData)
    .then((res) => {
      console.log("import accreditation----------->", res);
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

const exportAccreditationMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ACCREDITATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'Accreditation.xlsx';
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
const exportAllAccreditationMaster = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_ACCREDITATION_API}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllAccreditation.xlsx';
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

const CreateAccreditationMaster = (entityId: string, accrediationId: number) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ACCREDITATION_API}`, {
    EntityId: entityId,
    AccrediationId: accrediationId
  }).then((res) => {
    console.log("create message----->", res);

    if (res.data.isSuccess === true) {
      return { data: res.data.data, message: res.data.message, error: null };
    }
    return { data: null, message: res.data.errorMessage, error: res.data };
  }).catch(err => {
    return { data: null, error: err, message: err };
  })
}

const EditAccreditationMaster = (entityaccrId: number, entityId: string, accrediationId: number) => (dispatch) => {
  return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ACCREDITATION_API}/${entityaccrId}`, {
    EntityId: entityId,
    AccrediationId: accrediationId
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
  getAccreditationMaster,
  deleteAccreditationMaster,
  importAccreditationMaster,
  exportAccreditationMaster,
  exportAllAccreditationMaster,
  CreateAccreditationMaster,
  EditAccreditationMaster
}
