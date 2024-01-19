import http from '../../utils/http';
import { cognito } from '../../../config';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT, GET_EXTERNAL_USERS_URL,
    GET_EXTERNAL_USER_LIST, GET_EXTERNAL_USER_DETAILS,
    ENABLE_EXTERNAL_USER, DISABLE_EXTERNAL_USER,
    GLOBAL_SIGNOUT_EXTERNAL_USER, CREATE_EXTERNAL_USER,
    EXTERNAL_RESET_PASSWORD, GET_EXTERNAL_USER_ENTITIES,
    EXTERNAL_UNLINK_ENTITY, EXTERNAL_ADD_LINKED_ACCOUNTS,
    UPDATE_EXTERNAL_USER, EXTERNAL_USER_AUTH_EVENTS,
} from '../constants';

const getExternalUserList = (page = null, limit = null, search = null, isMaxPage = false, isLimitChange = false, isSearchChange = false, order = null, sort = null) => (dispatch) => {
    const query = queryBuilder({
        poolId: `${cognito.externalUserPoolId}`,
        page,
        limit,
        search,
        order,
        sort
    });

    return http.get(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}${query ? `?${query}` : ``}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_EXTERNAL_USER_LIST,
                    payload: {
                        ...(isMaxPage && { paginationToken: data.paginationToken }),
                        ...((isLimitChange || isSearchChange) && { paginationToken: [null, data.paginationToken] }),
                        limit,
                        list: data.lstUser,
                        count: data.found,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_EXTERNAL_USER_LIST, {
                list: [],
                count: 0
            })
        })
}

const getExternalUserDetail = (id) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}?poolId=${cognito.externalUserPoolId}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_EXTERNAL_USER_DETAILS,
                    payload: {
                        detail: data,
                        error: null
                    }
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_EXTERNAL_USER_DETAILS, { detail: {} })
        });
}

const createExternalUser = (data) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}`, { poolId: `${cognito.externalUserPoolId}`, ...data })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: ENABLE_EXTERNAL_USER,
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
            return errorHandler(err, dispatch, ENABLE_EXTERNAL_USER, { success: null })
        });
}

const enableExternalUser = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}/enable`, { poolId: `${cognito.externalUserPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: CREATE_EXTERNAL_USER,
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
            return errorHandler(err, dispatch, CREATE_EXTERNAL_USER, { success: null })
        });
}

const disableExternalUser = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}/disable`, { poolId: `${cognito.externalUserPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: DISABLE_EXTERNAL_USER,
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
            return errorHandler(err, dispatch, DISABLE_EXTERNAL_USER, { success: null })
        });
}

const externalResetPassword = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}/reset-user-password`, { poolId: `${cognito.externalUserPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: EXTERNAL_RESET_PASSWORD,
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
            return errorHandler(err, dispatch, EXTERNAL_RESET_PASSWORD, { success: null })
        });
}

const globalSignOutExternalUser = (id) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}/global-sign-out`, { poolId: `${cognito.externalUserPoolId}` })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: GLOBAL_SIGNOUT_EXTERNAL_USER,
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
            return errorHandler(err, dispatch, GLOBAL_SIGNOUT_EXTERNAL_USER, { success: null })
        });
}

const updateExternalUser = (id, data) => (dispatch) => {
    return http.put(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}`, {
        poolId: `${cognito.externalUserPoolId}`,
        ...data
    })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: UPDATE_EXTERNAL_USER,
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
            return errorHandler(err, dispatch, UPDATE_EXTERNAL_USER, { success: null })
        });
}
const getExternalUserEntities = (id) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${id}/list-entity`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_EXTERNAL_USER_ENTITIES,
                    payload: {
                        list: data,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_EXTERNAL_USER_ENTITIES, {
                list: [],
            })
        })
}

const externalUnlinkEntity = (userID, entityID) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${userID}/unlink-entity`, { EntityId: entityID })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: EXTERNAL_UNLINK_ENTITY,
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
            return errorHandler(err, dispatch, EXTERNAL_UNLINK_ENTITY, { success: null })
        });
}

const externalAddLinkedAccounts = (userID, JoinCode) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${userID}/link-entity`, { JoinCode })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: EXTERNAL_ADD_LINKED_ACCOUNTS,
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
            return errorHandler(err, dispatch, EXTERNAL_ADD_LINKED_ACCOUNTS, { success: null })
        });
}

const externalUserAuthEvents = (userID) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_EXTERNAL_USERS_URL}/${userID}/auth-events?poolId=${cognito.externalUserPoolId}`)
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: EXTERNAL_USER_AUTH_EVENTS,
                    payload: {
                        list: data.lstAuthEvents,
                        error: null,
                    }
                });
            }
            return { status, message }
        })
        .catch(err => {
            return errorHandler(err, dispatch, EXTERNAL_USER_AUTH_EVENTS, { list: [] })
        });
}

export {
    getExternalUserList, getExternalUserDetail,
    enableExternalUser, disableExternalUser,
    globalSignOutExternalUser, createExternalUser,
    externalResetPassword, getExternalUserEntities,
    externalUnlinkEntity, externalAddLinkedAccounts,
    updateExternalUser, externalUserAuthEvents,
};