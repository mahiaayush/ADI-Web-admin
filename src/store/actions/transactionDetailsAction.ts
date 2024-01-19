import http from '../../utils/http';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT_V2, GET_TRANSACTION_DETAILS_URL,
    GET_TRANSACTION_DETAILS
} from '../constants';

const getTransactionDetails = (id) => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_TRANSACTION_DETAILS_URL}/${id}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_TRANSACTION_DETAILS,
                    payload: {
                        detail: data,
                        error: null
                    }
                });
            }
         return res;
        }).catch(err => {
            errorHandler(err, dispatch, GET_TRANSACTION_DETAILS, { detail: {} })
            return err?.response?.data?.message;
        });
}

export { getTransactionDetails };