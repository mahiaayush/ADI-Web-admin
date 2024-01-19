import {
    GET_ACTION_PLAN_SUCCESS,
    GET_ACTION_PLAN_ERROR,
  } from "../constants";
  
  const initialState = {
    actionPlanResponse: {
      data: {},
    }
  };
  
  const ActionPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ACTION_PLAN_SUCCESS:
        return {
          ...state,
          actionPlanResponse: {
            ...state.actionPlanResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ACTION_PLAN_ERROR:
        return {
          ...state,
          actionPlanResponse: {
            ...state.actionPlanResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default ActionPlanReducer;