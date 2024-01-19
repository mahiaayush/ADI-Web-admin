import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_COUNSELLOR_LIST_URL, GET_COUNSELLOR_LIST, GET_COUNSELLOR_LIST_ALL
} from '../constants';

const getCounsellorsList = (page = null, limit = null, type = null, /*   isLimitChange = false, isSearchChange = false,  */search = null, orderBy = null, sortBy = null, order = null) => (dispatch) => {
    let query = "";
    /* if (search !== null) { 
        query = queryBuilder({
            paginationToken: "",
            limit,
            type,
            search
        });
    } else {  */
    query = queryBuilder({
        page,
        limit,
        type,
        search,
        orderBy,
        sortBy,
        order
    });
    // }
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_LIST_URL}${`?${query}`}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_COUNSELLOR_LIST,
                    payload: {
                        ...({ page: data.page }),
                        /* ...((isLimitChange || isSearchChange) && { paginationToken: [null, data.paginationToken] }), */
                        limit,
                        list: data.lstCounselor,
                        count: data.found,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_COUNSELLOR_LIST, {
                list: [],
                count: 0
            })
        })
}
const getCounsellorsListAll = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_LIST_URL}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_COUNSELLOR_LIST_ALL,
                    payload: {
                        list: data.lstCounselor,
                        count: data.found,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_COUNSELLOR_LIST_ALL, {
                list: [],
                count: 0
            })
        })
}
export { getCounsellorsList, getCounsellorsListAll };