import http from '../../utils/http';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT, GET_SESSION_LOGS_URL, GET_SESSION_LOGS
} from '../constants';

let resp;
const getSessionLogs = (id) => (dispatch) => {
    resp = (http.get(`${ADMIN_API_ENDPOINT}${GET_SESSION_LOGS_URL}/${id}`)
    .then((res) => {
        const { data, status } = res.data;
        if (status === true) {
            dispatch({
                type: GET_SESSION_LOGS,
                payload: {
                    list: data,
                    error: null
                },

            });
        }
    }).catch(err => {
        errorHandler(err, dispatch, GET_SESSION_LOGS, {
            list: []
        })
    }))
    return resp;
}

export { getSessionLogs };