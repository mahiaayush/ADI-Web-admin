import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_PT_OFFERINGS,
  GET_PT_OFFERINGS_SUCCESS,
  GET_PT_OFFERINGS_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetPlatformOfferingAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_PT_OFFERINGS}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_PT_OFFERINGS_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_PT_OFFERINGS_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetPlatformOfferingAction
