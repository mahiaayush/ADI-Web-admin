import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_GLOBAL_TAX_LIST,
  GET_GLOBAL_TAX_LIST_SUCCESS,
  GET_GLOBAL_TAX_LIST_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetGlobalTaxListAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_GLOBAL_TAX_LIST}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_GLOBAL_TAX_LIST_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_GLOBAL_TAX_LIST_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetGlobalTaxListAction
