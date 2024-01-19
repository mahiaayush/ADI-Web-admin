import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ACTIVE_USERS,
  GET_ACTIVE_USERS_SUCCESS,
  GET_ACTIVE_USERS_ERROR,
  GET_PREMIUM_COUNT,
  GET_PREMIUM_COUNT_SUCCESS,
  GET_PREMIUM_COUNT_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const ActiveUsersAction = (StartDate = null, EndDate = null, page = null, limit = null, search = null, sortBy = null, order = null) => async (dispatch) => {
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
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_USERS}?page=${page}&limit=${limit}&EndDate=${EndDate}&search=${search}`;
  // } else if (StartDate && !EndDate) {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_USERS}?page=${page}&limit=${limit}&StartDate=${StartDate}&search=${search}`;
  // } else if (!StartDate && !EndDate) {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_USERS}?page=${page}&limit=${limit}&search=${search}`;
  // } else {
  //   query = `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_USERS}?page=${page}&limit=${limit}&StartDate=${StartDate}&EndDate=${EndDate}&search=${search}`;
  // }
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_USERS}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ACTIVE_USERS_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_ACTIVE_USERS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export const PremiumUsersAction = () => async (dispatch) => {
    try {
      const res = await http.get(`${ADMIN_API_ENDPOINT_V2}${GET_PREMIUM_COUNT}`);
      if (res.data.status === true) {
        dispatch({
          type: GET_PREMIUM_COUNT_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_PREMIUM_COUNT_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default ActiveUsersAction