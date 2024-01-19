import http from '../../utils/http';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT_V2, GET_USER_VPA_DETAILS_URL,
    GET_USER_VPA_DETAILS
} from '../constants';

const getUserVpaDetails = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_USER_VPA_DETAILS_URL}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_USER_VPA_DETAILS,
                    payload: {
                        detail: data,
                        error: null
                    }
                });
            }
         return res;
        }).catch(err => {
            errorHandler(err, dispatch, GET_USER_VPA_DETAILS, { detail: {} })
            return err?.response?.data?.message;
        });
}

export { getUserVpaDetails };