import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_MASTERENTITY_API,
  GET_MASTERENTITY_SUCCESS,
  GET_MASTERENTITY_ERROR,

  // DELETE_ENTITYCOURSES_API,
  // CREATE_ENTITYCOURSES_API,

  EXPORT_MASTERENTITY_API,

  EXPORT_ALL_MASTERENTITY_API,

  IMPORT_MASTERENTITY_API,

  GET_ENTITYTYPE_LIST_API,
  GET_ENTITYTYPE_LIST_SUCCESS,
  GET_ENTITYTYPE_LIST_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getEntityTypeList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_ENTITYTYPE_LIST_API}`)
    .then((res) => {
      console.log("getEntityTypeList------>", res);
      if (res.data.status) {
        dispatch({
          type: GET_ENTITYTYPE_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_ENTITYTYPE_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getMasterEntity = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });

  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTERENTITY_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("getMasterEntity------>", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_MASTERENTITY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_MASTERENTITY_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}

const deleteMasterEntity = (entityId: string) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTERENTITY_API}/${entityId}`)
    .then((res) => {
      console.log("delete EntityCourses----------->", res);
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res?.data };
    }).catch(err => {
      return { data: null, error: err };
    })
}

const exportMasterEntity = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_MASTERENTITY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'MasterEntity.xlsx';
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

const exportMasterAllEntity = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_MASTERENTITY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'AllMasterEntity.xlsx';
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

const importMasterEntity = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_MASTERENTITY_API}`, formData)
    .then((res) => {
      console.log("import entitycourses----------->", res);
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

const CreateMasterEntity = (entityTypeId: string, entityName: number,
  entityAlias: string, entityOrigin: number, salt: string, requestId: string, joinCode: string, entityStreetAddress: string,
  entityLocality: string, entityRegion: string, entityPostalCode: string, entityCountry: string, stateId: number, cityId: number, entityWebAddress: string,
  naac: string, _status: string, isWebinar: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTERENTITY_API}`, {
      EntityTypeId: entityTypeId,
      EntityName: entityName,
      EntityAlias: entityAlias,
      EntityOrigin: entityOrigin,
      Salt: salt,
      RequestId: requestId,
      JoinCode: joinCode,
      EntityStreetAddress: entityStreetAddress,
      EntityLocality: entityLocality,
      EntityRegion: entityRegion,
      EntityPostalCode: entityPostalCode,
      EntityCountry: entityCountry,
      StateId: stateId,
      CityId: cityId,
      EntityWebAddress: entityWebAddress,
      Naac: naac,
      Status: _status,
      IsWebinar: isWebinar
    }).then((res) => {
      console.log("create data---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }
const EditMasterEntity = (entityId: string, entityTypeId: string, entityName: number,
  entityAlias: string, entityOrigin: number, salt: string, requestId: string, joinCode: string, entityStreetAddress: string,
  entityLocality: string, entityRegion: string, entityPostalCode: string, entityCountry: string, stateId: number, cityId: number, entityWebAddress: string,
  naac: string, _status: string, isWebinar: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTERENTITY_API}/${entityId}`, {
      EntityTypeId: entityTypeId,
      EntityName: entityName,
      EntityAlias: entityAlias,
      EntityOrigin: entityOrigin,
      Salt: salt,
      RequestId: requestId,
      JoinCode: joinCode,
      EntityStreetAddress: entityStreetAddress,
      EntityLocality: entityLocality,
      EntityRegion: entityRegion,
      EntityPostalCode: entityPostalCode,
      EntityCountry: entityCountry,
      StateId: stateId,
      CityId: cityId,
      EntityWebAddress: entityWebAddress,
      Naac: naac,
      Status: _status,
      IsWebinar: isWebinar
    }).then((res) => {
      console.log("Edit data---->", res);
      if (res.data.isSuccess === true) {
        return { data: res.data.data, message: res.data.message, error: null };
      }
      return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
      return { data: null, error: err, message: err };
    })
  }

export {
  getEntityTypeList,
  getMasterEntity,
  deleteMasterEntity,
  importMasterEntity,
  exportMasterEntity,
  exportMasterAllEntity,
  CreateMasterEntity,
  EditMasterEntity
}