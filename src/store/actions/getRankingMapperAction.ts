import http from "../../utils/http";
import {
  ADMIN_DATA_API_ENDPOINT_V1,
  GET_RANKINGMAPPER_API,
  GET_RANKINGMAPPER_SUCCESS,
  GET_RANKINGMAPPER_ERROR,
  DELETE_RANKINGMAPPER_API,
  EXPORT_RANKINGMAPPER_API,
  IMPORT_RANKINGMAPPER_API,
  CREATE_RANKINGMAPPER_API,
  EXPORT_ALL_RANKINGMAPPER_API,
  GET_RANKING_LIST_API,
  GET_RANKING_LIST_SUCCESS,
  GET_RANKING_LIST_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getRankingList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RANKING_LIST_API}`)
    .then((res) => {
      console.log("Ranking List------>", res);
      if (res.data.status) {
        dispatch({
          type: GET_RANKING_LIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_RANKING_LIST_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const getRankingMapperMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RANKINGMAPPER_API}${query ? `?${query}` : ``}`)
    .then((res) => {
      console.log("Ranking Mapper------>", res);
      if (res.data.isSuccess) {
        dispatch({
          type: GET_RANKINGMAPPER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_RANKINGMAPPER_ERROR,
          payload: res.data,
        });
      }
    }).catch(err => {
      console.log("erroraction", err)
    })
}
const deleteRankingMapperMaster = (campusId: number) => async dispatch => {
  return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_RANKINGMAPPER_API}/${campusId}`)
    .then((res) => {
      if (res.data.isSuccess === true) {
        return { ...res, error: null };
      }
      return { data: null, error: res };
    }).catch(err => {
      return { data: null, error: err };
    })
}
const importRankingMapperMaster = (formData: any) => (dispatch) => {
  return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_RANKINGMAPPER_API}`, formData)
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
const exportRankingMapperMaster = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    order,
    sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_RANKINGMAPPER_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterRankingMapper.xlsx';
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
const exportAllRankingMapperMaster = (sort = 1, order = -1) => async (dispatch) => {
  const query = queryBuilder({
    // page,
    // limit,
    // order,
    // sort
  });
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_RANKINGMAPPER_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
    .then((res) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(res.data);
      link.download = 'masterAllRankingMapper.xlsx';
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
const CreateRankingMapperMaster = (entityId: string, rnkorgId: number,
  rnkYear: string, rnkNum: number, rnkFor: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RANKINGMAPPER_API}`, {
      EntityId: entityId,
      RnkorgId: rnkorgId,
      RnkYear: rnkYear,
      RnkNum: rnkNum,
      RnkFor: rnkFor
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
const EditRankingMapperMaster = (entityrnkId: number, entityId: string, rnkorgId: number,
  rnkYear: string, rnkNum: number, rnkFor: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RANKINGMAPPER_API}/${entityrnkId}`, {
      EntityId: entityId,
      RnkorgId: rnkorgId,
      RnkYear: rnkYear,
      RnkNum: rnkNum,
      RnkFor: rnkFor
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
  getRankingList,
  getRankingMapperMaster,
  deleteRankingMapperMaster,
  importRankingMapperMaster,
  exportRankingMapperMaster,
  exportAllRankingMapperMaster,
  EditRankingMapperMaster,
  CreateRankingMapperMaster
}