import http from '../../utils/http';
import errorHandler from '../../utils/error';
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2, GET_FEEDBACK_LIST_URL, GET_FEEDBACK_DETAILS
} from '../constants';

const getFeedbackDetail = (id) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_FEEDBACK_LIST_URL}/${id}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_FEEDBACK_DETAILS,
                    payload: {
                       data,
                       message: '',
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_FEEDBACK_DETAILS, {
                list: [],
                count: 0
            })
        })
}

export { getFeedbackDetail };