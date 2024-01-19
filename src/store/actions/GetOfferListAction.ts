import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    OFFER_DATA,
    GET_OFFER_LIST_SUCCESS,
    GET_OFFER_LIST_ERROR,
    GET_COUPON_DETAIL_SUCCESS,
    GET_COUPON_DETAIL_ERROR,
    CLEAR_COUPON_DETAIL,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

 const getOfferListAction = (page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    sortBy,
    order,
});  
    return http.get(`${ADMIN_API_ENDPOINT_V2}${OFFER_DATA}${query ? `?${query}` : ``}`)
    .then((res) => {
        if (res.data.status) {
            dispatch({
                type: GET_OFFER_LIST_SUCCESS,
                payload: res.data.data,
              });
        } else {
            dispatch({
              type: GET_OFFER_LIST_ERROR,
              payload: res.data,
            });
          }
    }).catch(err => {
    })
  };

const GetCouponDetailAction = (couponId) => async (dispatch) => {
    return http.get(`${ADMIN_API_ENDPOINT_V2}${OFFER_DATA}/${couponId}`)
    .then((res) => {
        if (res.data.status) {
            dispatch({
                type: GET_COUPON_DETAIL_SUCCESS,
                payload: res.data.data,
              });
        } else {
            dispatch({
              type: GET_COUPON_DETAIL_ERROR,
              payload: res.data,
            });
          }
    }).catch(err => {
    })
  };

const ClearCouponDataAction = () => async (dispatch) => {
  dispatch({
    type: CLEAR_COUPON_DETAIL,
    payload: {},
  });
};

export { getOfferListAction, GetCouponDetailAction, ClearCouponDataAction }