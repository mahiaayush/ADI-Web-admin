import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_R_OCCUPATIONMETA_API,
    GET_R_OCCUPATIONMETA_SUCCESS,
    GET_R_OCCUPATIONMETA_ERROR,
    DELETE_R_OCCUPATIONMETA_API,
    EXPORT_R_OCCUPATIONMETA_API,
    IMPORT_R_OCCUPATIONMETA_API,
    CREATE_R_OCCUPATIONMETA_API,
    EXPORT_ALL_R_OCCUPATIONMETA_API,
    POST_R_OCCUPATIONMETA_SUCCESS,
    POST_R_OCCUPATIONMETA_ERROR,
    PUT_R_OCCUPATIONMETA_SUCCESS,
    PUT_R_OCCUPATIONMETA_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getROccupationMeta = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_R_OCCUPATIONMETA_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            console.log("Rometa------>", res);
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_R_OCCUPATIONMETA_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_R_OCCUPATIONMETA_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("erroraction", err)
        })
}
const deleteROccupationMeta = (regcarMetaId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_R_OCCUPATIONMETA_API}/${regcarMetaId}`)
        .then((res) => {
            console.log("delete OCCUPATIONMETA----->", res);
            if (res.data.isSuccess === true) {
                return { ...res, error: null };
            }
            return { data: null, error: res?.data };
        }).catch(err => {
            return { data: null, error: err };
        })
}

const EditROccupationMeta = (regcarMetaId: number, occupationMetaData: any) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_R_OCCUPATIONMETA_API}/${regcarMetaId}`, occupationMetaData)
        .then((res) => {
          const { data, isSuccess, message, errorMessage } = res.data;
          console.log("res.data", res.data);
          if (res.data.isSuccess) {
              dispatch({
                  type: PUT_R_OCCUPATIONMETA_SUCCESS,
                  payload: res.data,
                });
          } else {
              dispatch({
                type: PUT_R_OCCUPATIONMETA_ERROR,
                payload: res.data,
              });
          }
          return { isSuccess, message: message || errorMessage };
        })
  }

const CreateROccupationMeta = (occupationMetaData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_R_OCCUPATIONMETA_API}`, occupationMetaData)
    .then((res) => {
      console.log("occupationMetaData ", res.data)
      const { data, isSuccess, message, errorMessage } = res.data;
        if (res.data.isSuccess) {
            dispatch({
                type: POST_R_OCCUPATIONMETA_SUCCESS,
                payload: res.data,
              });
        } else {
            dispatch({
              type: POST_R_OCCUPATIONMETA_ERROR,
              payload: res.data,
            });
        }
        return { isSuccess, message: message || errorMessage };
    }).catch(err => {
          console.log("erroraction", err)           
    })
}

const exportROccupationMeta = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_R_OCCUPATIONMETA_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'OcupationMeta.xlsx';
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
const exportAllROccupationMeta = (sort = 1, order = -1) => async (dispatch) => {
    const query = queryBuilder({
        // page,
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_R_OCCUPATIONMETA_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'AllOcupationMeta.xlsx';
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

const importROccupationMeta = (formData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_R_OCCUPATIONMETA_API}`, formData)
        .then((res) => {
            console.log("import Occupation Meta----------->", res);
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
export {
    getROccupationMeta,
    deleteROccupationMeta,
    EditROccupationMeta,
    CreateROccupationMeta,
    exportROccupationMeta,
    exportAllROccupationMeta,
    importROccupationMeta
}