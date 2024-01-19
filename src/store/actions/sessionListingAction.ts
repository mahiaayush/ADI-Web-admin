import http from '../../utils/http';
import {
    ADMIN_API_ENDPOINT_V2, GET_SESSION_LISTING, GET_SESSION_LISTING_SUCCESS, GET_SESSION_LISTING_ERROR
} from '../constants';

const sessionListingAction = (page, limit, StartDate, EndDate) => async (dispatch) => {
  let query;
  if (!StartDate && EndDate) {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_SESSION_LISTING}?page=${page}&limit=${limit}&EndDate=${EndDate}`;
  } else if (StartDate && !EndDate) {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_SESSION_LISTING}?page=${page}&limit=${limit}&StartDate=${StartDate}`;
  } else if (!StartDate && !EndDate) {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_SESSION_LISTING}?page=${page}&limit=${limit}`;
  } else {
    query = `${ADMIN_API_ENDPOINT_V2}${GET_SESSION_LISTING}?page=${page}&limit=${limit}&StartDate=${StartDate}&EndDate=${EndDate}`;
  }
    try {
      const res = await http.get(
        query
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_SESSION_LISTING_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SESSION_LISTING_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default sessionListingAction;