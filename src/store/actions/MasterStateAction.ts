import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_MASTER_STATE_API,
    GET_MASTER_STATE_SUCCESS,
    GET_MASTER_STATE_ERROR,
    EXPORT_ALL_MASTER_STATE_API,
    EXPORT_MASTER_STATE_API,
    IMPORT_MASTER_STATE_API,
    POST_MASTER_STATE_SUCCESS,
    POST_MASTER_STATE_ERROR,
    PUT_MASTER_STATE_SUCCESS,
    PUT_MASTER_STATE_ERROR,
    GET_MASTER_COUNTRY_LIST_API,
    GET_MASTER_COUNTRY_LIST_SUCCESS,
    GET_MASTER_COUNTRY_LIST_ERROR

} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getMasterCountryList = () => (dispatch) => {
  return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_COUNTRY_LIST_API}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_MASTER_COUNTRY_LIST_SUCCESS,
                    payload: res.data,
                  });
            } else {
                dispatch({
                  type: GET_MASTER_COUNTRY_LIST_ERROR,
                  payload: res.data,
                });
            }
        }).catch(err => {
             console.log("erroraction", err)           
        })
}

const getMasterState = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_STATE_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_MASTER_STATE_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_MASTER_STATE_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("erroraction", err)
        })
}

const deleteMasterState = (StateId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_STATE_API}/${StateId}`)
        .then((res) => {
            if (res.data.isSuccess === true) {
                return { ...res, error: null };
            }
            return { data: null, error: res.data };
        }).catch(err => {
            return { data: null, error: err };
        })
}
const exportMasterStateAll = () => async (dispatch) => {
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_MASTER_STATE_API}`, { responseType: 'blob' })
        .then(res => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data)
            link.download = 'MasterState.xlsx';
            link.click();
            if (res.data) {
                return { data: res.data, error: null };
            }
            return { data: null, error: res.data.detail.message };
        }).catch(err => {
            return { data: null, error: err };
        })
}
const exportMasterState = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_MASTER_STATE_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data)
            link.download = 'MasterState.xlsx';
            link.click();
            if (res.data) {
                return { data: res.data, error: null };
            }
            return { data: null, error: res.data.detail.message };
        }).catch(err => {
            return { data: null, error: err };
        })
}
const importMasterState = (fromData: any) => async (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_MASTER_STATE_API}`, fromData)
        .then((res) => {
            if (res.data.isSuccess === true) {
                return { data: res.data.data, message: res.data.message, error: null };
            }
            return { data: null, message: res.data.message, error: res.data };
        }).catch(err => {
            return { data: null, error: err, message: 'an Error occerd' };
        })
}

const saveMasterState = (MasterStateData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_STATE_API}`, MasterStateData)
        .then((res) => { 
            const { data, isSuccess, message, errorMessage } = res.data;
            if (res.data.isSuccess) {
                dispatch({
                    type: POST_MASTER_STATE_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: POST_MASTER_STATE_ERROR,
                    payload: res.data,
                });
            }
            return { isSuccess, message: message || errorMessage };
        }).catch(err => {
            console.log("erroraction", err)
        })
}

const updateMasterState = (StateId: number, MasterStateData: any) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_STATE_API}/${StateId}`, MasterStateData)
        .then((res) => {
            const { data, isSuccess, message, errorMessage } = res.data;
            if (res.data.isSuccess) {
                dispatch({
                    type: PUT_MASTER_STATE_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: PUT_MASTER_STATE_ERROR,
                    payload: res.data,
                });
            }
            return { isSuccess, message: message || errorMessage };
        })
}

export { getMasterCountryList, getMasterState, deleteMasterState, exportMasterState, importMasterState, saveMasterState, updateMasterState, exportMasterStateAll }