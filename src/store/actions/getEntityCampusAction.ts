import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_ENTITYCAMPUS_API,
  GET_ENTITYCAMPUS_SUCCESS,
  GET_ENTITYCAMPUS_ERROR,
  DELETE_ENTITYCAMPUS_API,
  EXPORT_ENTITYCAMPUS_API,
  EXPORT_ALL_ENTITYCAMPUS_API,
  IMPORT_ENTITYCAMPUS_API,
  CREATE_ENTITYCAMPUS_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getEntityCampusMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ENTITYCAMPUS_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("get Campus Entity----->", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_ENTITYCAMPUS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ENTITYCAMPUS_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteEntityCampusMaster = (campusId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_ENTITYCAMPUS_API}/${campusId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importEntityCampusMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_ENTITYCAMPUS_API}`, formData)
    .then((res) => {
      console.log("import entitycampus----------->", res);
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
const exportEntityCampusMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ENTITYCAMPUS_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'EntityCampus.xlsx';
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
const exportAllEntityCampusMaster = () => async (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_ENTITYCAMPUS_API}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllEntityCampus.xlsx';
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
const CreateEntityCampusMaster = (entityId: string, campusName: string,
  campusAddress: string, campusUrl: string, campusImg: string, status: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ENTITYCAMPUS_API}`, {
      EntityId: entityId,
      CampusName: campusName,
      CampusAddress: campusAddress,
      CampusUrl: campusUrl,
      CampusImg: campusImg,
      Status: status
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
const EditEntityCampusMaster = (campusId: number, entityId: string, campusName: string,
  campusAddress: string, campusUrl: string, campusImg: string, status: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_ENTITYCAMPUS_API}/${campusId}`, {
      EntityId: entityId,
      CampusName: campusName,
      CampusAddress: campusAddress,
      CampusUrl: campusUrl,
      CampusImg: campusImg,
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
  getEntityCampusMaster,
  deleteEntityCampusMaster,
  importEntityCampusMaster,
  exportEntityCampusMaster,
  exportAllEntityCampusMaster,
  CreateEntityCampusMaster,
  EditEntityCampusMaster
}