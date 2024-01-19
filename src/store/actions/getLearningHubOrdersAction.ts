import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_LEARNING_HUB_ORDER,
    GET_LEARNING_HUB_ORDER_SUCCESS,
    GET_LEARNING_HUB_ORDER_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const getLearningHubOrdersAction = (page = null, limit = null, search = null, PaymentStatus = null, orderBy = null, sortBy = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    PaymentStatus,
    orderBy,
    sortBy
  })
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_LEARNING_HUB_ORDER}?${query}`
      );
      if (res?.data?.status === true) {
        dispatch({
          type: GET_LEARNING_HUB_ORDER_SUCCESS,
          payload: res?.data?.data,
        });
      } else {
        dispatch({
          type: GET_LEARNING_HUB_ORDER_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

export default getLearningHubOrdersAction