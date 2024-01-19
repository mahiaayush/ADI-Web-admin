import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ENTITIES_ITEM_MASTER,
  GET_ENTITIES_ITEM_MASTER_SUCCESS,
  GET_ENTITIES_ITEM_MASTER_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetEntityItemMasterAction = (search = null, page = null, limit = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    search,
    page,
    limit,
    sortBy,
    order,
});
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_ITEM_MASTER}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ENTITIES_ITEM_MASTER_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ENTITIES_ITEM_MASTER_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetEntityItemMasterAction
