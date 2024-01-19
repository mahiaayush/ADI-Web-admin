import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_ENTITIES_URL,
    GET_ENTITY_LIST, GET_ENTITY_DETAILS, SET_ENTITY_STATUS, GET_ENTITY_FILTER_LIST
} from '../constants';

const getEntityList = (page = null, limit = null, search = null, order = null, sort = null) => (dispatch) => {
    let nameOrJoinCode = ''; let type = ''; let region = ''; let status = '';
    search.map(val => {
        if (val.id === "name") {
            nameOrJoinCode = val.value
        }
        if (val.id === "type") {
            type = val.value
        }
        if (val.id === "EntityRegion") {
            region = val.value
        }
        if (val.id === "status") {
            status = val.value
        }
        return val.vale;
    })
    const query = queryBuilder({ page, limit, nameOrJoinCode, type, region, status, order, sort })

    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_URL}${query ? `?${query}` : ``}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_ENTITY_LIST,
                    payload: {
                        list: data.lstEntity,
                        count: data.found,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_ENTITY_LIST, {
                list: [],
                count: 0
            })
        })
}

const getEntityDetail = (id) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_URL}/${id}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_ENTITY_DETAILS,
                    payload: {
                        detail: data,
                        error: null
                    }
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_ENTITY_DETAILS, { detail: {} })
        });
}

const setEntityStatus = (requestID, entityId, requestStatus) => (dispatch) => {
    return http.post(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_URL}/verify`, {
        EntityRequestId: requestID,
        RespondCode: requestStatus,
        EntityId: entityId
    })
        .then((res) => {
            const { data, status, message } = res.data;
            if (status === true) {
                dispatch({
                    type: SET_ENTITY_STATUS,
                    payload: {
                        verify: data,
                        error: null
                    }
                });
            }
            return { status, message }
        }).catch(err => {
            return errorHandler(err, dispatch, SET_ENTITY_STATUS, {
                detail: {}
            })
        });
}

const getEntityfilterlist = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_URL}/filters`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_ENTITY_FILTER_LIST,
                    payload: {
                        filterListitems: data,
                        error: null
                    }
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_ENTITY_FILTER_LIST, { filterListitems: {} })
        });
}

export { getEntityList, getEntityDetail, setEntityStatus, getEntityfilterlist };