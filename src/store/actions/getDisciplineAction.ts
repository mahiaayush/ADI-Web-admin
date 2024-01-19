import http from "../../utils/http";
import {
    ADMIN_DATA_API_ENDPOINT_V1,
    GET_DISCIPLINE_API,
    GET_DISCIPLINE_SUCCESS,
    GET_DISCIPLINE_ERROR,
    EXPORT_DISCIPLINE_API,
    IMPORT_DISCIPLINE_API,
    DELETE_DISCIPLINE_API,
    CREATE_DISCIPLINE_API
} from "src/store/constants";
import queryBuilder from "src/utils/query";
import axios from "axios";

const getDisciplineMaster = (page = 0, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${GET_DISCIPLINE_API}${query ? `?${query}` : ``}`)
        .then((res) => {
            console.log("res ==>", res)
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_DISCIPLINE_SUCCESS,
                    payload: res.data,
                });
            } else {
                dispatch({
                    type: GET_DISCIPLINE_ERROR,
                    payload: res.data,
                });
            }
        }).catch(err => {
            console.log("errorAction", err)
        })
}

const CreateDisciplineMaster = (disciplineName: string) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_DISCIPLINE_API}`, {
        DisciplineName: disciplineName
    }).then((res) => {
        console.log("Create data----->", res);
        if (res.data.isSuccess === true) {
            return { data: res.data.data, message: res.data.data.message, error: null };
        }
        return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
        return { data: null, error: err, message: err };
    })
}
const EditDisciplineMaster = (disciplineId: number, disciplineName: string) => (dispatch) => {
    return http.put(`${ADMIN_DATA_API_ENDPOINT_V1}${CREATE_DISCIPLINE_API}/${disciplineId}`, {
        DisciplineName: disciplineName
    }).then((res) => {
        console.log("edit discipline data----->", res);
        if (res.data.isSuccess === true) {
            return { data: res.data.data, message: res.data.message, error: null };
        }
        return { data: null, message: res.data.errorMessage, error: res.data };
    }).catch(err => {
        return { data: null, error: err, message: err };
    })
}

const exportDiscipline = (page = 1, limit = 50, search = null, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        page,
        limit,
        search,
        order,
        sort
    });
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_DISCIPLINE_API}${query ? `?${query}` : ``} `, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'Discipline.xlsx';
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
const exportAllDiscipline = () => (dispatch) => {
    return http.get(`${ADMIN_DATA_API_ENDPOINT_V1}${EXPORT_DISCIPLINE_API} `, { responseType: 'blob' })
        .then((res) => {
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(res.data);
            link.download = 'AllDiscipline.xlsx';
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
const importDisciplineMaster = (formData: any) => (dispatch) => {
    return http.post(`${ADMIN_DATA_API_ENDPOINT_V1}${IMPORT_DISCIPLINE_API}`, formData)
        .then((res) => {
            if (res.data.isSuccess === true) {
                console.log("res----------->", res);
                return { data: res.data.data, message: res.data.message, error: null };
            }
            return { data: null, message: res.data.message, error: res.data };
        })
        .catch(err => {
            console.log("erroraction", err)
            return { data: null, error: err, message: err };
        })
}
const deleteDisciplineMaster = (disciplineId: number) => async dispatch => {
    return http.delete(`${ADMIN_DATA_API_ENDPOINT_V1}${DELETE_DISCIPLINE_API}/${disciplineId}`)
        .then((res) => {
            if (res.data.isSuccess === true) {
                return { data: res.data.message, error: null };
            }
            return { data: null, error: res.data.detail.message };
        }).catch(err => {
            return { data: null, error: err };
        })
}

export {
    getDisciplineMaster,
    exportDiscipline,
    exportAllDiscipline,
    importDisciplineMaster,
    deleteDisciplineMaster,
    CreateDisciplineMaster,
    EditDisciplineMaster
}