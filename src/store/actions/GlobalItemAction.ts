import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    POST_GLOBAL_ITEMS,
    POST_GLOBAL_ITEMS_SUCCESS,
    POST_GLOBAL_ITEMS_ERROR,
} from "src/store/constants";

export const postGlobalItem = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_GLOBAL_ITEMS}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: POST_GLOBAL_ITEMS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: POST_GLOBAL_ITEMS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
 }
};