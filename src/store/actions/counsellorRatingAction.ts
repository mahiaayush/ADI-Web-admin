import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_COUNSELLOR_RATING,
  GET_COUNSELLOR_RATING_SUCCESS,
  GET_COUNSELLOR_RATING_ERROR,
} from "src/store/constants";

const CounsellorRatingAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_COUNSELLOR_RATING}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_COUNSELLOR_RATING_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_COUNSELLOR_RATING_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default CounsellorRatingAction