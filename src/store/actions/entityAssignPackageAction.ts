import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    POST_ENTITIES_ASSIGN_PACKAGE,
    ENTITIES_ASSIGN_PACKAGE_SUCCESS,
    ENTITIES_ASSIGN_PACKAGE_ERROR
} from "src/store/constants";

export const postEntityAssignPackage = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_ENTITIES_ASSIGN_PACKAGE}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: ENTITIES_ASSIGN_PACKAGE_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: ENTITIES_ASSIGN_PACKAGE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };