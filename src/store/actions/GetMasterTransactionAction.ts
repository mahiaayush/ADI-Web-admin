import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_MASTER_TRANSACTION,
    GET_MASTER_TRANSACTION_SUCCESS,
    GET_MASTER_TRANSACTION_ERROR,
    GET_UNIQUE_MASTER_TRANSACTION_SUCCESS,
    GET_UNIQUE_MASTER_TRANSACTION_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

 const getMasterTransactionAction = (page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    sortBy,
    order,
});  
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_MASTER_TRANSACTION}${query ? `?${query}` : ``}`)
    .then((res) => {
        if (res.data.status) {
            dispatch({
                type: GET_MASTER_TRANSACTION_SUCCESS,
                payload: res.data.data,
              });
        } else {
            dispatch({
              type: GET_MASTER_TRANSACTION_ERROR,
              payload: res.data,
            });
          }
    }).catch(err => {
    })
  };

  const getUniqueMasterTransactionAction = (transactionId) => async (dispatch) => {
      return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_MASTER_TRANSACTION}/${transactionId}`)
      .then((res) => {
          if (res.data.status) {
              dispatch({
                  type: GET_UNIQUE_MASTER_TRANSACTION_SUCCESS,
                  payload: res.data.data,
                });
          } else {
              dispatch({
                type: GET_UNIQUE_MASTER_TRANSACTION_ERROR,
                payload: res.data,
              });
            }
      }).catch(err => {
      })
    };

  export { getMasterTransactionAction, getUniqueMasterTransactionAction }