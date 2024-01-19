import http from '../../utils/http';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT_V2, GET_LEARNER_SESSION_LIST, GET_DASHBOARD_LEARNER_SESSION_LIST_URL
} from '../constants';

let resp;
const getLearnerSessionList = (limit = null, type = null, search = null, smassociationId = null, hash = null) => (dispatch) => {
        resp = (http.get(`${ADMIN_API_ENDPOINT_V2}${GET_DASHBOARD_LEARNER_SESSION_LIST_URL}?learnerId=${smassociationId}&hash=${hash}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_LEARNER_SESSION_LIST,
                    payload: {
                        /* ...({ paginationToken: data.paginationToken }), */
                        limit,
                        list: data,
                        count: data.count,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_LEARNER_SESSION_LIST, {
                list: [],
                count: 0
            })
        }))
    return resp;
}

export { getLearnerSessionList };