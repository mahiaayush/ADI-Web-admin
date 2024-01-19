import http from '../../utils/http';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT_V2, GET_COUNSELLOR_OCCUPANCY_URL, GET_COUNSELLOR_OCCUPANCY_LIST
} from '../constants';
import queryBuilder from '../../utils/query';

const counsellorOccupancyList = (Date = null, StartTime = null, EndTime = null) => (dispatch) => {
    let query = "";
    query = queryBuilder({
        Date,
        StartTime,
        EndTime
    });
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_OCCUPANCY_URL}${`?${query}`}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_COUNSELLOR_OCCUPANCY_LIST,
                    payload: {
                        list: data,
                        error: null
                    },

                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_COUNSELLOR_OCCUPANCY_LIST, {
                list: []
            })
        })
}

export { counsellorOccupancyList };