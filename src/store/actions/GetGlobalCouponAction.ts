import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_GLOBAL_COUPON,
  GET_GLOBAL_COUPON_SUCCESS,
  GET_GLOBAL_COUPON_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

export const getGlobalCouponAction = (page = null, limit = null, search = null, sortBy = null, order = null) =>
  async (dispatch) => {
    const query = queryBuilder({
      page,
      limit,
      search,
      sortBy,
      order,
    });
    return http
      .get(
        `${ADMIN_API_ENDPOINT_V2}${GET_GLOBAL_COUPON}${
          query ? `?${query}` : ``
        }`
      )
      .then((res) => {
        if (res.data.status) {
          dispatch({
            type: GET_GLOBAL_COUPON_SUCCESS,
            payload: res.data.data,
          });
        } else {
          dispatch({
            type: GET_GLOBAL_COUPON_ERROR,
            payload: res.data,
          });
        }
        return res;
      })
      .catch((err) => {
        return err?.response?.data?.message;
      });
  };
