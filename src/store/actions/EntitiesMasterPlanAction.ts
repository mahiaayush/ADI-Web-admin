import http from "../../utils/http";
import {
  ADMIN_API_ENDPOINT_V2,
  GET_ENTITIES_MASTER_PLAN,
  GET_ENTITIES_MASTER_PLAN_SUCCESS,
  GET_ENTITIES_MASTER_PLAN_ERROR,
} from "src/store/constants";
import queryBuilder from "src/utils/query";

const GetEntityMasterPlanAction = (EntityId) => async (dispatch) => {
    try {
      const res = await http.get(
        `${ADMIN_API_ENDPOINT_V2}${GET_ENTITIES_MASTER_PLAN}?EntityId=${EntityId}`
      );
      if (res.data.status === true) {
        dispatch({
          type: GET_ENTITIES_MASTER_PLAN_SUCCESS,
          payload: res.data,
        });
      } else {
        dispatch({
          type: GET_ENTITIES_MASTER_PLAN_ERROR,
          payload: res.data,
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  export default GetEntityMasterPlanAction
