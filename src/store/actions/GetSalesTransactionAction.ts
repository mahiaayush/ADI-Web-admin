import http from "../../utils/http";
import queryBuilder from '../../utils/query';
import errorHandler from '../../utils/error';
import {
    ADMIN_API_ENDPOINT_V2,
    GET_SALSE_TRANSACTION_URL,
    GET_SALSE_TRANSACTION_LIST
} from "src/store/constants";

  const GetSalesTransactionActionList = (payment_mode = null, search = null, limit = null, page = null, status = null) => async (dispatch) => {
    const query = queryBuilder({ payment_mode, status, search, limit, page });

    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_SALSE_TRANSACTION_URL}${query ? `?${query}` : ``}`)
        .then((res) => {
            const { data, status } = res.data;
            if (status === true) {
                dispatch({
                    type: GET_SALSE_TRANSACTION_LIST,
                    payload: {
                        list: data.rows,
                        count: data.count,
                        error: null
                    },
                });
            }
        }).catch(err => {
            errorHandler(err, dispatch, GET_SALSE_TRANSACTION_LIST, {
                list: [],
                count: 0
            })
        })
}

export { GetSalesTransactionActionList };
