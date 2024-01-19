import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_OCCUPATION_QUALIFICATION_API,
    GET_OCCUPATION_QUALIFICATION_SUCCESS,
    GET_OCCUPATION_QUALIFICATION_ERROR,
    GET_OCCUPATION_QUALIFICATION_LIST_SUCCESS,
    GET_OCCUPATION_QUALIFICATION_LIST_ERROR,
    EXPORT_OCCUPATION_QUALIFICATION_ALLDATA_API,
    EXPORT_OCCUPATION_QUALIFICATION_API,
    IMPORT_OCCUPATION_QUALIFICATION_API,
    POST_OCCUPATION_QUALIFICATION_SUCCESS,
    POST_OCCUPATION_QUALIFICATION_ERROR,
    PUT_OCCUPATION_QUALIFICATION_SUCCESS,
    PUT_OCCUPATION_QUALIFICATION_ERROR
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getOccupationQualification = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
    limit,
    search,
    order,
    sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATION_QUALIFICATION_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_OCCUPATION_QUALIFICATION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_OCCUPATION_QUALIFICATION_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("erroraction", err)
        })
}

const deleteOccupationQualification = (FaqId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATION_QUALIFICATION_API}/${FaqId}`)
        .then((res) => {
            if (res.data.isSuccess === true) {
                return { ...res, error: null };
            }
            return { data: null, error: res.data };
        }).catch(err => {
            return { data: null, error: err };
        })
}
const exportOccupationQualificationAll = () => async (dispatch) => {
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATION_QUALIFICATION_ALLDATA_API}`, { responseType: 'blob' })
        .then(res => {
            console.log("responce is commming", res);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data)
            link.download = 'OccupationQualification.xlsx';
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
const exportOccupationQualification = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATION_QUALIFICATION_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            console.log("responce is commming", res);
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data)
            link.download = 'OccupationQualification.xlsx';
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
const importOccupationQualification = (fromData: any) => async (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_OCCUPATION_QUALIFICATION_API}`, fromData)
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

const saveOccupationQualification = (OccupationQualificationData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATION_QUALIFICATION_API}`, OccupationQualificationData)
        .then((res) => {
            console.log("saveOccupationQualification", res.data)
            const { data, isSuccess, message, errorMessage } = res.data;
            if (res.data.isSuccess) {
                dispatch({
                    type: POST_OCCUPATION_QUALIFICATION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: POST_OCCUPATION_QUALIFICATION_ERROR,
                    payload: res.data,
                });
            }
            return { isSuccess, message: message || errorMessage };
        }).catch(err => {
            console.log("erroraction", err)
        })
}

const updateOccupationQualification = (SectionId: number, OccupationQualificationData: any) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATION_QUALIFICATION_API}/${SectionId}`, OccupationQualificationData)
        .then((res) => {
            const { data, isSuccess, message, errorMessage } = res.data;
            console.log("res.data", res.data);
            if (res.data.isSuccess) {
                dispatch({
                    type: PUT_OCCUPATION_QUALIFICATION_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: PUT_OCCUPATION_QUALIFICATION_ERROR,
                    payload: res.data,
                });
            }
            return { isSuccess, message: message || errorMessage };
        })
}

export { getOccupationQualification, deleteOccupationQualification, exportOccupationQualification, importOccupationQualification, saveOccupationQualification, updateOccupationQualification, exportOccupationQualificationAll }