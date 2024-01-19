import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_DASHBOARD_LEARNER_LIST_URL, GET_DASHBOARD_LEARNER_DETAILS
} from '../constants';

const getLearnersDetails = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_DASHBOARD_LEARNER_LIST_URL}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_DASHBOARD_LEARNER_DETAILS,
                    payload: {
                        list: data.final_lstLearners,
                        count: data.found,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_DASHBOARD_LEARNER_DETAILS, {
                list: [],
                count: 0
            })
        })
}

export { getLearnersDetails };