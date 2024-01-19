import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_RANK_API,
    CREATE_RANK_API,
    GET_RANK_SUCCESS,
    GET_RANK_ERROR,
    EXPORT_RANK_API,
    DELETE_RANK_API,
    IMPORT_RANK_API,
    EXPORT_ALL_RANK_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import axios from "axios";

const getRankPages = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_RANK_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            console.log("res ==>", res)
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_RANK_SUCCESS,
                    payload: res?.data,
                });
            } else {
                dispatch({
                    type: GET_RANK_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("errorAction", err)
        })
}

const CreateRankMaster = (rankOrgName: string, status: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RANK_API}`, {
        RnkorgName: rankOrgName,
        Status: status
    }).then((res) => {
        console.log("create rank data-------", res);
        if (res.data.isSuccess === true) {
            return { data: res.data.data, message: res.data.data.message, error: null };
        }
        return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
        return { data: null, error: err, message: err };
    })
}

const EditRankMaster = (rankorgId: number, rankOrgName: string, status: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_RANK_API}/${rankorgId}`, {
        RnkorgName: rankOrgName,
        Status: status
    }).then((res) => {
        if (res.data.isSuccess === true) {
            return { data: res.data.data, message: res.data.data.message, error: null };
        }
        return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
        return { data: null, error: err, message: err };
    })
}

const exportRank = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_RANK_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'MasterRank.xlsx';
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
const exportAllRank = (sort = 1, order = -1) => async (dispatch) => {
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_RANK_API}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'AllMasterRank.xlsx';
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

const importRankMaster = (formData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_RANK_API}`, formData)
        .then((res) => {
            console.log("Import res----------->", res);
            if (res.data.isSuccess === true) {
                return { data: res.data.data, message: res.data.message, error: null };
            }
            return { data: null, message: res.data.ErrorMessage, error: res.data };
        })
        .catch(err => {
            console.log("erroraction", err)
            return { data: null, error: err, message: err };
        })
}

const deleteRankMaster = (RnkorgId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_RANK_API}/${RnkorgId}`)
        .then((res) => {
            console.log("deleter Rank", res);
            if (res.data.isSuccess === true) {
                return { data: res.data, error: null };
            }
            return { data: null, error: res.data };
        }).catch(err => {
            console.log("erroraction", err)
            return { data: null, error: err };
        })
}
export {
    getRankPages,
    deleteRankMaster,
    importRankMaster,
    exportRank,
    exportAllRank,
    CreateRankMaster,
    EditRankMaster
}