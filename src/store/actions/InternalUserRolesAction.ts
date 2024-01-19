import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_INTERNAL_USER_ROLES,
  GET_INTERNAL_USER_ROLES_SUCCESS,
  GET_INTERNAL_USER_ROLES_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const InternalUserRoleAction = () => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_INTERNAL_USER_ROLES}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_INTERNAL_USER_ROLES_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_INTERNAL_USER_ROLES_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default InternalUserRoleAction
