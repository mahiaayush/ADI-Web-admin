import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    GET_OLD_ACTIONPLANS,
    GET_OLD_ACTIONPLAN_SUCCESS,
    GET_OLD_ACTIONPLAN_ERROR,
} from "src/store/constants";

 const AllActionPlansAction = (smassociationId, userSid, subscribeId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_OLD_ACTIONPLANS}/${smassociationId}?UserSid=${userSid}&subscribeId=${subscribeId}`, 
        );
      if (res.data.status === true) {
        dispatch({
          type: GET_OLD_ACTIONPLAN_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: GET_OLD_ACTIONPLAN_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
 }
};

export { AllActionPlansAction };