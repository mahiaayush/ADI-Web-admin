import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    POST_ENTITIES_MAP_ITEM,
    POST_ENTITIES_MAP_ITEM_SUCCESS,
    POST_ENTITIES_MAP_ITEM_ERROR,
} from "src/store/constants";

 const postEntityMapItem = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_ENTITIES_MAP_ITEM}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: POST_ENTITIES_MAP_ITEM_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: POST_ENTITIES_MAP_ITEM_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
 }
};

export { postEntityMapItem };