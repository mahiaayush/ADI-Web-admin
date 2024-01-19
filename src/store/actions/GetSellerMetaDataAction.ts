import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  SELLER_META_DATA,
  GET_SELLER_META_DATA_SUCCESS,
  GET_SELLER_META_DATA_ERROR,
  GET_UNIQUE_SELLER_META_DATA_SUCCESS,
  GET_UNIQUE_SELLER_META_DATA_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetSellerMetaDataAction = (page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
    sortBy,
    order,
});  
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${SELLER_META_DATA}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_SELLER_META_DATA_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SELLER_META_DATA_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const GetUniqueSellerMetaDataAction = (userSid) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${SELLER_META_DATA}/${userSid}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_UNIQUE_SELLER_META_DATA_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_UNIQUE_SELLER_META_DATA_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export { GetSellerMetaDataAction, GetUniqueSellerMetaDataAction } 
