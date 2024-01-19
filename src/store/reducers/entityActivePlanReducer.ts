import {
    ENTITIES_ACTIVE_PLAN_SUCCESS,
    ENTITIES_ACTIVE_PLAN_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    entityActivePlan: {
      data: {},
    }
  };
  
  const entityActivePlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case ENTITIES_ACTIVE_PLAN_SUCCESS:
        return {
          ...state,
          entityActivePlan: {
            ...state.entityActivePlan,
            data: action.payload,
            success: true,
          },
          
        };
      case ENTITIES_ACTIVE_PLAN_ERROR:
        return {
          ...state,
          entityActivePlan: {
            ...state.entityActivePlan,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityActivePlanReducer;