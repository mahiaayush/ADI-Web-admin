import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_SELLER_DATA,
  GET_SELLER_DATA_SUCCESS,
  GET_SELLER_DATA_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetSellerDataAction = (page = null, limit = null, search = null) => async (dispatch) => {
  const query = queryBuilder({
    page,
    limit,
    search,
});  
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_SELLER_DATA}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_SELLER_DATA_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SELLER_DATA_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export { GetSellerDataAction } 
