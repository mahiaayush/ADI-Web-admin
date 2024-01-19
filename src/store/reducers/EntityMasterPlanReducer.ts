import { GET_ENTITIES_MASTER_PLAN_SUCCESS, GET_ENTITIES_MASTER_PLAN_ERROR } from "../constants";

const initialState = {
  getEntityMasterPlanResponse: {
    data: [],
  },
};

const EntityMasterPlanReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTITIES_MASTER_PLAN_SUCCESS:
      return {
        ...state,
        getEntityMasterPlanResponse: {
          ...state.getEntityMasterPlanResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_ENTITIES_MASTER_PLAN_ERROR:
      return {
        ...state,
        getEntityMasterPlanResponse: {
          ...state.getEntityMasterPlanResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default EntityMasterPlanReducer;
