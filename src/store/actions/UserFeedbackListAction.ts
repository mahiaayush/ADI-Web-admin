import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_FEEDBACKLIST_URL,
  GET_FEEDBACKLIST_SUCCESS,
  GET_FEEDBACKLIST_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const UserFeedbackListAction = (fromDate = null, toDate = null, rating_id = null, search = null, limit = null, page = null) => async (dispatch) => {
    const query = queryBuilder({
        fromDate,
        toDate,
        rating_id,
        search,
        limit,
        page
    });
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_FEEDBACKLIST_URL}?${query}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_FEEDBACKLIST_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_FEEDBACKLIST_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default UserFeedbackListAction
