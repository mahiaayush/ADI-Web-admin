import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    POST_ENTITY_PACKAGE,
    POST_ENTITY_PACKAGE_SUCCESS,
    POST_ENTITY_PACKAGE_ERROR,
} from "src/store/constants";

 const postEntityPackageAction = (data) => async (dispatch) => {
    try {
      const res = await http.post(
        `${ADMIN_API_ENDPOINT_V2}${POST_ENTITY_PACKAGE}`, data 
        );
      if (res.data.status === true) {
        dispatch({
          type: POST_ENTITY_PACKAGE_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: POST_ENTITY_PACKAGE_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
 }
};

export { postEntityPackageAction };