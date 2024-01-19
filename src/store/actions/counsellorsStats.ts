import http from '../../utils/http';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT, GET_COUNSELLOR_STATS_URL, GET_COUNSELLOR_STATS
} from '../constants';

const counsellorsStats = () => (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT}${GET_COUNSELLOR_STATS_URL}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_COUNSELLOR_STATS,
                    payload: {
                        list: data,
                        count: data.found,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_COUNSELLOR_STATS, {
                list: [],
                count: 0
            })
        })
}

export { counsellorsStats };