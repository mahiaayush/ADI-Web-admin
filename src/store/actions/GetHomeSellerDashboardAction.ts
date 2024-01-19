import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_SELLER_DASHBOARD,
    GET_SELLER_DASHBOARD_SUCCESS,
    GET_SELLER_DASHBOARD_ERROR,
} from "src/store/constants";

export const getHomeSellerDashboardAction = (page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => { 
    return http.get(`${ADMIN_API_ENDPOINT_V2}${GET_SELLER_DASHBOARD}`)
    .then((res) => {
        if (res.data.status) {
            dispatch({
                type: GET_SELLER_DASHBOARD_SUCCESS,
                payload: res.data.data,
              });
        } else {
            dispatch({
              type: GET_SELLER_DASHBOARD_ERROR,
              payload: res.data,
            });
          }
    }).catch(err => {
    })
  };
