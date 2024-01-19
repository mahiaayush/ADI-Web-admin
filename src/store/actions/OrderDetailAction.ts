import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_LEARNING_HUB_ORDER,
    GET_LEARNING_HUB_ORDER_DETAIL,
    GET_LEARNING_HUB_ORDER_DETAIL_SUCCESS,
    GET_LEARNING_HUB_ORDER_DETAIL_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getOrderDetailAction = (order_number) => async (dispatch) => {
  const query = queryBuilder({
    order_number
  })
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_LEARNING_HUB_ORDER_DETAIL}?${query}`
      );
      if (res?.data?.status === true) {
        dispatch({
          type: GET_LEARNING_HUB_ORDER_DETAIL_SUCCESS,
          payload: res?.data?.data,
        });
      } else {
        dispatch({
          type: GET_LEARNING_HUB_ORDER_DETAIL_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_LEARNING_HUB_ORDER_DETAIL_ERROR,
        payload: {}
      });
      console.log("error", error);
    }
  };

export default getOrderDetailAction