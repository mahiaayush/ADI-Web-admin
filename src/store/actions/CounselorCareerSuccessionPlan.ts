import http from "../../utils/http";
import {
    ADMIN_API_ENDPOINT_V2,
    COUNSELOR_CAREER_SUCCESSION_PLAN,
    COUNSELOR_CAREER_SUCCESSION_PLAN_SUCCESS,
    COUNSELOR_CAREER_SUCCESSION_PLAN_ERROR
} from "src/store/constants";

export const CounsellorCareerSuccessionPlan = (scheduleId, userSid) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${COUNSELOR_CAREER_SUCCESSION_PLAN}/${scheduleId}?userSid=${userSid}`,
      );
     
      if (res.data.status) {
        dispatch({
          type: COUNSELOR_CAREER_SUCCESSION_PLAN_SUCCESS,
          payload: res.data.data,
        });
      } else {
        dispatch({
          type: COUNSELOR_CAREER_SUCCESSION_PLAN_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };