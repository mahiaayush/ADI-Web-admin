import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    COUNSELOR_LEARNERS_DETAIL,
    COUNSELOR_LEARNERS_DETAIL_SUCCESS,
    COUNSELOR_LEARNERS_DETAIL_ERROR
} from "src/store/constants";

export const CounsellorLearnerDetailAction = (SubscribeId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${COUNSELOR_LEARNERS_DETAIL}/${SubscribeId}`,
      );
     
      if (res.data.status) {
        dispatch({
          type: COUNSELOR_LEARNERS_DETAIL_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: COUNSELOR_LEARNERS_DETAIL_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };