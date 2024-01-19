import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_MASTER_EXAMINATION_API,
    GET_MASTER_EXAMINATION_SUCCESS,
    GET_MASTER_EXAMINATION_ERROR,
    EXPORT_MASTER_EXAMINATION_ALLDATA_API,
    EXPORT_MASTER_EXAMINATION_API,
    IMPORT_MASTER_EXAMINATION_API,
    POST_MASTER_EXAMINATION_SUCCESS,
    POST_MASTER_EXAMINATION_ERROR,
    PUT_MASTER_EXAMINATION_SUCCESS,
    PUT_MASTER_EXAMINATION_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getMasterExamination = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_EXAMINATION_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_MASTER_EXAMINATION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_MASTER_EXAMINATION_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("erroraction", err)
        })
}

const deleteMasterExamination = (FaqId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_EXAMINATION_API}/${FaqId}`)
        .then((res) => {
            if (res.data.isSuccess === true) {
                return { ...res, error: null };
            }
            return { data: null, error: res.data };
        }).catch(err => {
            return { data: null, error: err };
        })
}
const exportMasterExaminationAll = () => async (dispatch) => {
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_MASTER_EXAMINATION_ALLDATA_API}`, { responseType: 'blob' })
        .then(res => {
            console.log("responce is commming", res);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data)
            link.download = 'MasterExamination.xlsx';
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
const exportMasterExamination = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_MASTER_EXAMINATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            console.log("response is coming", res);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data)
            link.download = 'MasterExamination.xlsx';
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
const importMasterExamination = (fromData: any) => async (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_MASTER_EXAMINATION_API}`, fromData)
        .then((res) => {
            console.log("importCategory", res);
            if (res.data.isSuccess === true) {
                return { data: res.data.data, message: res.data.message, error: null };
            }
            return { data: null, message: res.data.message, error: res.data };
        }).catch(err => {
            console.log("erroraction", err)
            return { data: null, error: err, message: 'an Error occurred' };
        })
}

const saveMasterExamination = (MasterExaminationData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_EXAMINATION_API}`, MasterExaminationData)
        .then((res) => {
            console.log("saveMasterExamination", res.data)
            const { data, isSuccess, message, errorMessage } = res.data;
            if (res.data.isSuccess) {
                dispatch({
                    type: POST_MASTER_EXAMINATION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: POST_MASTER_EXAMINATION_ERROR,
                    payload: res.data,
                });
            }
            return { isSuccess, message: message || errorMessage };
        }).catch(err => {
            console.log("erroraction", err)
        })
}

const updateMasterExamination = (SectionId: number, MasterExaminationData: any) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_MASTER_EXAMINATION_API}/${SectionId}`, MasterExaminationData)
        .then((res) => {
            const { data, isSuccess, message, errorMessage } = res.data;
            console.log("res.data", res.data);
            if (res.data.isSuccess) {
                dispatch({
                    type: PUT_MASTER_EXAMINATION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: PUT_MASTER_EXAMINATION_ERROR,
                    payload: res.data,
                });
            }
            return { isSuccess, message: message || errorMessage };
        })
}

export { getMasterExamination, deleteMasterExamination, exportMasterExamination, importMasterExamination, saveMasterExamination, updateMasterExamination, exportMasterExaminationAll }