import http from '../../utils/http';
import { cognito } from '../../../config';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT, ADMIN_API_ENDPOINT_V2, GET_INTERNAL_USERS_URL,
    GET_INTERNAL_USERS_LIST, GET_INTERNAL_USERS_DETAILS,
    ENABLE_INTERNAL_USER, DISABLE_INTERNAL_USER,
    GLOBAL_SIGNOUT_INTERNAL_USER, CREATE_INTERNAL_USER,
    INTERNAL_RESET_PASSWORD, UPDATE_INTERNAL_USER,
    INTERNAL_USER_AUTH_EVENTS,
} from '../constants';

const getInternalUsersList = (page = null, limit = null, search = null, order = null, sortBy = null) => (dispatch) => {
    let query = "";
        query = queryBuilder({
            page,
            limit,
            search,
            order,
            sortBy
        });
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_INTERNAL_USERS_URL}?poolId=${cognito.userPoolId}${`&${query}`}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_INTERNAL_USERS_LIST,
                    payload: {
                        list: data.users,
                        count: data.count,
                        error: null
                    },
                });
            }
        })
        .catch(err => {
            errorHandler(err, dispatch, GET_INTERNAL_USERS_LIST, {
                list: [],
                count: 0
            })
        })
}
const getInternalUserDetail = (id) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_INTERNAL_USERS_URL}/${id}?poolId=${cognito.userPoolId}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_INTERNAL_USERS_DETAILS,
                    payload: {
                        detail: data,
                        error: null
                    }
                });
            }
        })
        .catch(err => {
            errorHandler(err, dispatch, GET_INTERNAL_USERS_DETAILS, { detail: {} })
        });
}
const createInternalUser = (data) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT_V2}${GET_INTERNAL_USERS_URL}`, { poolId: `${cognito.userPoolId}`, ...data })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: CREATE_INTERNAL_USER,
                    payload: {
                        detail: data,
                        error: null,
                        success: message
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, CREATE_INTERNAL_USER, { success: null })
        });
}
const enableInternalUser = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_INTERNAL_USERS_URL}/${id}/enable`, { poolId: `${cognito.userPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: ENABLE_INTERNAL_USER,
                    payload: {
                        detail: data,
                        error: null,
                        success: message
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, ENABLE_INTERNAL_USER, { success: null })
        });
}
const disableInternalUser = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_INTERNAL_USERS_URL}/${id}/disable`, { poolId: `${cognito.userPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: DISABLE_INTERNAL_USER,
                    payload: {
                        detail: data,
                        error: null,
                        success: message
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, DISABLE_INTERNAL_USER, { success: null })
        });
}
const internalResetPassword = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT_V2}${GET_INTERNAL_USERS_URL}/${id}/reset-user-password`, { poolId: `${cognito.userPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: INTERNAL_RESET_PASSWORD,
                    payload: {
                        detail: data,
                        error: null,
                        success: message
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, INTERNAL_RESET_PASSWORD, { success: null })
        });
}
const globalSignOutInternalUser = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_INTERNAL_USERS_URL}/${id}/global-sign-out`, { poolId: `${cognito.userPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: GLOBAL_SIGNOUT_INTERNAL_USER,
                    payload: {
                        detail: data,
                        error: null,
                        success: message
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, GLOBAL_SIGNOUT_INTERNAL_USER, { success: null })
        });
}
const updateInternalUser = (id, data) => (dispatch) => {
    return http.put(`${ADMIN_API_ENDPOINT_V2}${GET_INTERNAL_USERS_URL}/${id}`, {
        poolId: `${cognito.userPoolId}`,
        ...data
    })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: UPDATE_INTERNAL_USER,
                    payload: {
                        updateData: data,
                        error: null,
                        success: message
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, UPDATE_INTERNAL_USER, { success: null })
        });
}
const internalUserAuthEvents = (userID) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_INTERNAL_USERS_URL}/${userID}/auth-events?poolId=${cognito.userPoolId}`)
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: INTERNAL_USER_AUTH_EVENTS,
                    payload: {
                        list: data.lstAuthEvents,
                        error: null,
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, INTERNAL_USER_AUTH_EVENTS, { list: [] })
        });
}
export {
    getInternalUsersList, getInternalUserDetail,
    enableInternalUser, disableInternalUser,
    globalSignOutInternalUser, createInternalUser,
    internalResetPassword, updateInternalUser,
    internalUserAuthEvents
};