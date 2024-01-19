import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_GLOBAL_AVAILABILITY,
  GET_GLOBAL_AVAILABILITY_SUCCESS,
  GET_GLOBAL_AVAILABILITY_ERROR,
} from "src/store/constants";

const GetGlobalAvailabilityAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_GLOBAL_AVAILABILITY}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_GLOBAL_AVAILABILITY_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_GLOBAL_AVAILABILITY_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetGlobalAvailabilityAction
