import http from "../../utils/http";
import queryBuilder from '../../utils/query';
import {
    ADMIN_API_ENDPOINT_V2,
    GET_DASHBOARD_STATUS_DATA_URL,
    GET_DASHBOARD_STATUS_DATA_SUCCESS,
    GET_DASHBOARD_STATUS_DATA_ERROR
} from "src/store/constants";

export const dashboardStatusData = (filter = "Day") => async (dispatch) => {
    let query = "";
    /* if (search !== null) { 
        query = queryBuilder({
            paginationToken: "",
            limit,
            type,
            search
        });
    } else {  */
    query = queryBuilder({
        filter
    });
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_DASHBOARD_STATUS_DATA_URL}${`?${query}`}`,
      );
      // console.log("DetailAction", res);

      if (res.data.status) {
        dispatch({
          type: GET_DASHBOARD_STATUS_DATA_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_DASHBOARD_STATUS_DATA_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };