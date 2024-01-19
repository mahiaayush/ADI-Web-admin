import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ACTIVE_ENTITIES,
  GET_ACTIVE_ENTITIES_SUCCESS,
  GET_ACTIVE_ENTITIES_ERROR,
} from "src/store/constants";

const ActiveEntitiesAction = (applicationId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ACTIVE_ENTITIES}?ApplicationId=${applicationId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ACTIVE_ENTITIES_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_ACTIVE_ENTITIES_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default ActiveEntitiesAction