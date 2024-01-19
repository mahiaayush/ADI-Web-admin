import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_LOGISTIC_LIST,
  GET_LOGISTIC_LIST_SUCCESS,
  GET_LOGISTIC_LIST_ERROR,
  GET_LOGISTIC_DETAIL,
  GET_LOGISTIC_DETAIL_SUCCESS,
  GET_LOGISTIC_DETAIL_ERROR,
  GET_CARD_LOTS,
  GET_CARD_ALLOCATION_LIST_SUCCESS,
  GET_CARD_LOTS_SUCCESS,
  GET_CARD_LOTS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetLogisticListAction = (printStatus = null, cardStatus = null, search = null, page = null, limit = null, sortBy = null, order = null) =>
  async (dispatch) => {
    const query = queryBuilder({
      printStatus,
      cardStatus,
      search,
      page,
      limit,
      sortBy,
      order,
    });
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_LOGISTIC_LIST}${
          query ? `?${query}` : ``
        }`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_LOGISTIC_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_LOGISTIC_LIST_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

const GetLogisticDetailAction = (membershipId) => async (dispatch) => {
  try {
    const res = await http.get(
      `${ADMIN_API_ENDPOINT_V2}${GET_LOGISTIC_DETAIL}/${membershipId}`
    );
    if (res.data.status === true) {
      dispatch({
        type: GET_LOGISTIC_DETAIL_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_LOGISTIC_DETAIL_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

const GetCardLotListAction = () => async (dispatch) => {
  try {
    const res = await http.get(
      `${ADMIN_API_ENDPOINT_V2}${GET_CARD_LOTS}`
    );
    if (res.data.status === true) {
      dispatch({
        type: GET_CARD_LOTS_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: GET_CARD_LOTS_ERROR,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};
export { GetLogisticListAction, GetLogisticDetailAction, GetCardLotListAction };
