import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_INVENTORY_URL,
    GET_INVENTORY_LIST,
    CHANGE_INVENTORY_STATUS_SUCCESS,
    CHANGE_INVENTORY_STATUS_URL,
    CHANGE_INVENTORY_STATUS_ERROR
} from '../constants';

const getInventoryList = (page = null, limit = null, search = null, filter = null) => (dispatch) => {
    const query = queryBuilder({ page, limit, search, filter })

    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_INVENTORY_URL}${query ? `?${query}` : ``}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_INVENTORY_LIST,
                    payload: {
                        list: data.rows,
                        count: data.count,
                        error: null
                    },
                });
                return { list: data.rows, count: data.count, error: null }
            }
            return { list: [], count: 0, error: "something went wrong" }
        }).catch(err => {
            errorHandler(err, dispatch, GET_INVENTORY_LIST, {
                list: [],
                count: 0
            })
            return { list: [], count: 0, error: null }
        })
}

const changeInventoryStatus = (data, inventoryId) => (dispatch) => {
    return http.put(`${ADMIN_API_ENDPOINT_V2}${CHANGE_INVENTORY_STATUS_URL}/${inventoryId}`, data)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: CHANGE_INVENTORY_STATUS_SUCCESS,
                    payload: data,
                });
            }
            return res;
        }).catch(err => {
            errorHandler(err, dispatch, CHANGE_INVENTORY_STATUS_ERROR, {
                list: [],
                count: 0
            })
            return err?.response?.data?.message
        })
}

export { getInventoryList, changeInventoryStatus };