import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_PERSONIFY_CSP,
    GET_PERSONIFY_CSP_SUCCESS,
    GET_PERSONIFY_CSP_ERROR
} from "src/store/constants";

export const getPersonifyCspAction = (smassociationId, subscribeId, UserSid) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_PERSONIFY_CSP}/${smassociationId}?subscribeId=${subscribeId}&UserSid=${UserSid}`,
        );
      if (res.data.status === true) {
        dispatch({
          type: GET_PERSONIFY_CSP_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_PERSONIFY_CSP_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };