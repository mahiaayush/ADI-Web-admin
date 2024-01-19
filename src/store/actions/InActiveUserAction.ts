import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_INACTIVE_USERS,
  GET_INACTIVE_USERS_SUCCESS,
  GET_INACTIVE_USERS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const InActiveUsersAction = (StartDate = null, EndDate = null, page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    StartDate,
    EndDate,
    page,
    limit,
    search,
    sortBy,
    order
});  
  // let query;
    // if (!StartDate && EndDate) {
    //   query = `${ADMIN_API_ENDPOINT_V2}${GET_INACTIVE_USERS}?page=${page}&limit=${limit}&EndDate=${EndDate}`;
    // } else if (StartDate && !EndDate) {
    //   query = `${ADMIN_API_ENDPOINT_V2}${GET_INACTIVE_USERS}?page=${page}&limit=${limit}&StartDate=${StartDate}`;
    // } else if (!StartDate && !EndDate) {
    //   query = `${ADMIN_API_ENDPOINT_V2}${GET_INACTIVE_USERS}?page=${page}&limit=${limit}`;
    // } else {
    //     query = `${ADMIN_API_ENDPOINT_V2}${GET_INACTIVE_USERS}?page=${page}&limit=${limit}&StartDate=${StartDate}&EndDate=${EndDate}`;
    //   }
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_INACTIVE_USERS}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_INACTIVE_USERS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_INACTIVE_USERS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default InActiveUsersAction