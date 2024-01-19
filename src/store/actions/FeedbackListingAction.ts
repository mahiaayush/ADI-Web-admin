import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_FEEDBACK_LIST_URL, GET_FEEDBACK_LIST
} from '../constants';

const getFeedbackList = (id, /* paginationToken = null, */ limit = null, search = null) => (dispatch) => {
    let query = "";
        query = queryBuilder({
            /* paginationToken, */
            limit,
            search
        });
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_FEEDBACK_LIST_URL}?UserSid=${id}${`&${query}`}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_FEEDBACK_LIST,
                    payload: {
                        /* ...({ paginationToken: data.paginationToken }), */
                        limit,
                        list: data.userdetails,
                        count: data.found,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_FEEDBACK_LIST, {
                list: [],
                count: 0
            })
        })
}

export { getFeedbackList };