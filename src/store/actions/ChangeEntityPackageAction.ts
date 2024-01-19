import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  CHANGE_ENTITY_PACKAGE,
  CHANGE_ENTITY_PACKAGE_SUCCESS,
  CHANGE_ENTITY_PACKAGE_ERROR,
} from "src/store/constants";

export const ChangeEntityPackageAction = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${CHANGE_ENTITY_PACKAGE}`,
        data
      );
      console.log(res.data)
      if (res.data.status === true) {
        dispatch({
          type: CHANGE_ENTITY_PACKAGE_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: CHANGE_ENTITY_PACKAGE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
