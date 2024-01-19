import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_OCCUPATIONSALARY_API,
    GET_OCCUPATIONSALARY_SUCCESS,
    GET_OCCUPATIONSALARY_ERROR,
    DELETE_OCCUPATIONSALARY_API,
    EXPORT_OCCUPATIONSALARY_API,
    IMPORT_OCCUPATIONSALARY_API,
    CREATE_OCCUPATIONSALARY_API,
    EXPORT_ALL_OCCUPATIONSALARY_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import { dispatch } from "react-hot-toast/dist/core/store";

const getOccupationSalary = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_OCCUPATIONSALARY_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            console.log("salary data-----.", res);

            if (res.data.isSuccess) {
                dispatch({
                    type: GET_OCCUPATIONSALARY_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_OCCUPATIONSALARY_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("erroraction", err)
        })
}
const deleteOccupationSalary = (SalregcarId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_OCCUPATIONSALARY_API}/${SalregcarId}`)
        .then((res) => {
            console.log("delete OccupationExam----->", res);
            if (res.data.status === true) {
                return { ...res, error: null };
            }
            return { data: res.data, error: res };
        }).catch(err => {
            return { data: null, error: err };
        })
}
const importOccupationSalary = (formData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_OCCUPATIONSALARY_API}`, formData)
        .then((res) => {
            console.log("import Occupation Exam----------->", res);
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
const exportOcupationSalary = (page = 1, limit = 50, search = null, order = null, sort = null) => async (dispatch) => {
    const query = queryBuilder({
        page,
    limit,
    search,
    order,
    sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_OCCUPATIONSALARY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'OccupationSalary.xlsx';
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
const exportAllOcupationSalary = (sort = 1, order = -1) => async (dispatch) => {
    const query = queryBuilder({
        // page,
        // limit,
        // order,
        // sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_ALL_OCCUPATIONSALARY_API}${query ? `?${query}` : ``}`, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'AllOccupationSalary.xlsx';
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
const CreateOccupationSalary = (regcarCode: string, salregcarFn: string, salregcarVal: number) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATIONSALARY_API}`, {
        RegcarCode: regcarCode,
        SalregcarFn: salregcarFn,
        SalregcarVal: salregcarVal
    }).then((res) => {
        console.log("Create OccupationSalary---->", res);
        if (res.data.isSuccess === true) {
            return { data: res.data.data, message: res.data.message, error: null };
        }
        return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
        return { data: null, error: err, message: err };
    })
}
const EditOccupationSalary = (salregcarId: number, regcarCode: string, salregcarFn: string, salregcarVal: number) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_OCCUPATIONSALARY_API}/${salregcarId}`, {
        RegcarCode: regcarCode,
        SalregcarFn: salregcarFn,
        SalregcarVal: salregcarVal
    }).then((res) => {
        console.log("Edit OccupationSalary---->", res);
        if (res.data.isSuccess === true) {
            return { data: res.data.data, message: res.data.message, error: null };
        }
        return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
        return { data: null, error: err, message: err };
    })
}

export {
    getOccupationSalary,
    deleteOccupationSalary,
    importOccupationSalary,
    exportOcupationSalary,
    exportAllOcupationSalary,
    CreateOccupationSalary,
    EditOccupationSalary
}
