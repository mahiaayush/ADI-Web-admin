import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_LEARNERS_LIST_URL, GET_LEARNERS_LIST
} from '../constants';

const getLearnersList = (id, /* paginationToken = null, */ limit = null, type = null, name = null) => (dispatch) => {
    let query = "";
        query = queryBuilder({
            /* paginationToken, */
            limit,
            type,
            name
        });
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_LEARNERS_LIST_URL}?hash=${id}${`&${query}`}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_LEARNERS_LIST,
                    payload: {
                        /* ...({ paginationToken: data.paginationToken }), */
                        limit,
                        list: data.lstLearners,
                        count: data.found,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_LEARNERS_LIST, {
                list: [],
                count: 0
            })
        })
}

export { getLearnersList };