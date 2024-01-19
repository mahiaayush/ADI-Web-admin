import http from '../../utils/http';
import {
    ADMIN_API_ENDPOINT_V2, GET_SESSION_SLOTS_OVERRIDE_LISTING, GET_SESSION_SLOTS_OVERRIDE_LISTING_SUCCESS, GET_SESSION_SLOTS_OVERRIDE_LISTING_ERROR
} from '../constants';
import queryBuilder from "src/utils/query"

const sessionSlotsOverrideListingAction = (search = null, page = null, limit = null, sortBy = null, order = null) => async (dispatch) => {
  const query = queryBuilder({
    search,
    page,
    limit,
    sortBy,
    order,
}); 

  try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_SESSION_SLOTS_OVERRIDE_LISTING}${query ? `?${query}` : ``}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_SESSION_SLOTS_OVERRIDE_LISTING_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SESSION_SLOTS_OVERRIDE_LISTING_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default sessionSlotsOverrideListingAction;