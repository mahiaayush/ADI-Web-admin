import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_SESSIONS_LIST,
  GET_SESSIONS_SUCCESS,
  GET_SESSIONS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const sessionsListAction = (StartDate = null, EndDate = null, Status = null, SubStatus = null, CounselorName = null, LearnerName = null, RoomName = null, limit = null, page = null, sortBy = null, order = null) => async (dispatch) => {
    const query = queryBuilder({
      StartDate,
        EndDate,
        Status,
        SubStatus,
        CounselorName,
        LearnerName,
        RoomName,
        limit,
        page,
        sortBy,
        order
    });
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_SESSIONS_LIST}?${query}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_SESSIONS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_SESSIONS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default sessionsListAction
