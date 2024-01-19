import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    POST_ENTITY_USER_DETAILS,
    POST_ENTITY_USER_DETAILS_SUCCESS,
    POST_ENTITY_USER_DETAILS_ERROR
} from "src/store/constants";

export const postEntityUserDetails = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_ENTITY_USER_DETAILS}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: POST_ENTITY_USER_DETAILS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: POST_ENTITY_USER_DETAILS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };