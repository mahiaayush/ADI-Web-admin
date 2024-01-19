import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_PLANS_URL,
  GET_PLANS_SUCCESS,
  GET_PLANS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetPlansAction = () => async (dispatch) => {
    // console.log("testInter", testInvitationId)
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_PLANS_URL}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_PLANS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PLANS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetPlansAction
