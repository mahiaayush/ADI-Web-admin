import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT, ADMIN_API_ENDPOINT_V2, GET_SELECTED_COUNSELLOR_LIST_URL, GET_SELECTED_COUNSELLOR_LIST, GET_SELECTED_COUNSELLOR_STATS, GET_SELECTED_COUNSELLOR_STATS_URL
} from '../constants';

const selectedCounsellorList = (filter = null, newest = null, plan = null, search = null, page = null, limit = null, sortBy = null, order = null) => (dispatch) => {
    const query = queryBuilder({
        filter,
        newest,
        plan,
        search,
        page,
        limit,
        sortBy,
        order
    });
        
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_SELECTED_COUNSELLOR_LIST_URL}${query ? `?${query}` : ``}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_SELECTED_COUNSELLOR_LIST,
                    payload: {
                        /* ...({ paginationToken: data.paginationToken }),
                        ...((isLimitChange || isSearchChange) && { paginationToken: [null, data.paginationToken] }),
                        limit, */
                        list: data.lstCounselor,
                        count: data.found,
                        error: null,
                        page: data.page 
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_SELECTED_COUNSELLOR_LIST, {
                list: [],
                count: 0
            })
        })
}

const selectedCounsellorStats = (userSID) => (dispatch) => {     
    return http.get(`${ADMIN_API_ENDPOINT}${GET_SELECTED_COUNSELLOR_STATS_URL}?UserSid=${userSID}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_SELECTED_COUNSELLOR_STATS,
                    payload: {
                        list: data,
                        count: data.found,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_SELECTED_COUNSELLOR_STATS, {
                list: [],
                count: 0
            })
        })
}

export { selectedCounsellorList, selectedCounsellorStats };