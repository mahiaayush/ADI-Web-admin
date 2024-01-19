import {
  REACT_APP_ACCOUNT_API_ENDPOINT,
  INDIVIDUAL_REGISTER,
  POST_INDIVIDUAL_REGISTER_SUCCESS,
  POST_INDIVIDUAL_REGISTER_ERROR,
  OTP_REGISTER,
  POST_OTP_REGISTER_SUCCESS,
  POST_OTP_REGISTER_ERROR,
  GET_SALES_APP_CUSTOMER_DATA_URL,
  GET_SALES_APP_CUSTOMER_DATA_SUCCESS,
  GET_SALES_APP_CUSTOMER_DATA_ERROR,
  ADMIN_API_ENDPOINT_V2,
  SALES_TRANSACTION,
  POST_SALES_TRANSACTION_SUCCESS,
  POST_SALES_TRANSACTION_ERROR,
  GET_OFFERING_DETAIL_URL,
  GET_OFFERING_DETAIL_SUCCESS,
  GET_OFFERING_DETAIL_ERROR,
  GET_CARD_VALIDITY_URL,
  GET_CARD_VALIDITY_SUCCESS,
  GET_CARD_VALIDITY_ERROR,
  DISABLE_TRANSACTION_URL,
  DISABLE_TRANSACTION_SUCCESS,
  DISABLE_TRANSACTION_ERROR,
  GET_USER_STATE_LIST,
  GET_USER_STATE_LIST_SUCCESS,
  GET_USER_STATE_LIST_ERROR
} from "../constants";
import http from "src/utils/http";
import axios from "axios";

const updateIndividualLogin = data => dispatch => {
    return axios
      .post(`${REACT_APP_ACCOUNT_API_ENDPOINT}${INDIVIDUAL_REGISTER}`, data,)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: POST_INDIVIDUAL_REGISTER_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: POST_INDIVIDUAL_REGISTER_ERROR,
            payload: res.data.message
          });
        }
        return res;
      })
      .catch(error => {
        return error?.message;
      });
  };

  const updateOTP = data => dispatch => {
    return axios
      .post(`${REACT_APP_ACCOUNT_API_ENDPOINT}${OTP_REGISTER}`, data,)
      .then(res => {
        if (res.data.success === true) {
          dispatch({
            type: POST_OTP_REGISTER_SUCCESS,
            payload: res.data
          });
        } else {
          dispatch({
            type: POST_OTP_REGISTER_ERROR,
            payload: res.data.message
          });
        }
        return res;
      })
      .catch(error => {
        return error?.message;
      });
  };

  const getUserData = (sid = null) => dispatch => {
    return http
      .get(`${ADMIN_API_ENDPOINT_V2}${GET_SALES_APP_CUSTOMER_DATA_URL}/${sid}`,)
      .then(res => {
        if (res.data.status === true) {
          dispatch({
            type: GET_SALES_APP_CUSTOMER_DATA_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: GET_SALES_APP_CUSTOMER_DATA_ERROR,
            payload: res.data.data.message
          });
        }
        return res;
      })
      .catch(error => {
        return error?.message;
      });
  };

  const getOfferingList = (pt = null) => dispatch => {
    return http
      .get(`${ADMIN_API_ENDPOINT_V2}${GET_OFFERING_DETAIL_URL}${pt}`,)
      .then(res => {
        if (res.data.status === true) {
          dispatch({
            type: GET_OFFERING_DETAIL_SUCCESS,
            payload: res.data.data
          });
        } else {
          dispatch({
            type: GET_OFFERING_DETAIL_ERROR,
            payload: res.data.data.message
          });
        }
        return res;
      })
      .catch(error => {
        return error?.message;
      });
  };

  const updateSalesTransaction = data => dispatch => {
    return http
    .post(`${ADMIN_API_ENDPOINT_V2}${SALES_TRANSACTION}`, data,)
    .then(res => {
      if (res.data.status === true) {
        dispatch({
          type: POST_SALES_TRANSACTION_SUCCESS,
          payload: res.data.data
        });
      } else {
        dispatch({
          type: POST_SALES_TRANSACTION_ERROR,
          payload: res.data.message
        });
      }
      return res;
    })
    .catch(error => {
      return error?.response?.data?.message;
    });
};

const checkCardValidity = (csmembershipid, pt_type, p_id) => (dispatch) => {
  return http
  .get(`${ADMIN_API_ENDPOINT_V2}${GET_CARD_VALIDITY_URL}/${csmembershipid}?ptOfferingId=${p_id}&pt_offering_type=${pt_type}`)
  .then(res => {
    if (res.data.status === true) {
      dispatch({
        type: GET_CARD_VALIDITY_SUCCESS,
        payload: res.data.data
      });
    } else {
      dispatch({
        type: GET_CARD_VALIDITY_ERROR,
        payload: res.data.message
      });
    }
    return res;
  })
  .catch(error => {
    return error?.response?.data?.message;
  });
};

const removeTransaction = (transactionId) => (dispatch) => {
  return http
  .patch(`${ADMIN_API_ENDPOINT_V2}${DISABLE_TRANSACTION_URL}/${transactionId}`)
  .then(res => {
    if (res.data.status === true) {
      dispatch({
        type: DISABLE_TRANSACTION_SUCCESS,
        payload: res.data.data
      });
    } else {
      dispatch({
        type: DISABLE_TRANSACTION_ERROR,
        payload: res.data.message
      });
    }
    return res;
  })
  .catch(error => {
    return error?.response?.data?.message;
  });
};

const getStateList = () => dispatch => {
  return http
    .get(`${ADMIN_API_ENDPOINT_V2}${GET_USER_STATE_LIST}`,)
    .then(res => {
      if (res.data.status === true) {
        dispatch({
          type: GET_USER_STATE_LIST_SUCCESS,
          payload: res.data.data
        });
      } else {
        dispatch({
          type: GET_USER_STATE_LIST_ERROR,
          payload: res.data.data.message
        });
      }
      return res;
    })
    .catch(error => {
      return error?.message;
    });
};

export { updateIndividualLogin, updateOTP, updateSalesTransaction, getUserData, getOfferingList, checkCardValidity, removeTransaction, getStateList }
