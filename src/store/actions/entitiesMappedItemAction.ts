import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ENTITIES_MAPPED_ITEMS,
  GET_ENTITIES_MAPPED_ITEMS_SUCCESS,
  GET_ENTITIES_MAPPED_ITEMS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetEntityMappedItemAction = (EntityPackageId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_MAPPED_ITEMS}?EntityPackageId=${EntityPackageId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ENTITIES_MAPPED_ITEMS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ENTITIES_MAPPED_ITEMS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetEntityMappedItemAction
