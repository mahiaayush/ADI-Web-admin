import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_DASHBOARD_LEARNER_LIST_URL, GET_DASHBOARD_LEARNER_LIST
} from '../constants';

const getDashboardSessionList = (page = null, limit = null, status = null, search = null, orderBy = null) => (dispatch) => {
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
        status,
        search,
        orderBy
    });
    // }
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_DASHBOARD_LEARNER_LIST_URL}${`?${query}`}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_DASHBOARD_LEARNER_LIST,
                    payload: {
                        ...({ page: data.page }),
                        /* ...((isLimitChange || isSearchChange) && { paginationToken: [null, data.paginationToken] }), */
                        limit,
                        list: data.final_lstLearners,
                        count: data.found,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_DASHBOARD_LEARNER_LIST, {
                list: [],
                count: 0
            })
        })
}

export { getDashboardSessionList };