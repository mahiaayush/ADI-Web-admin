import {
    COUNSELOR_CAREER_SUCCESSION_PLAN_SUCCESS,
    COUNSELOR_CAREER_SUCCESSION_PLAN_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    counselorCareerSuccessionPlanResponse: {
      data: {},
    },
  };
  
  const counselorCareerSuccessionPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case COUNSELOR_CAREER_SUCCESSION_PLAN_SUCCESS:
        return {
          ...state,
          counselorCareerSuccessionPlanResponse: {
            ...state.counselorCareerSuccessionPlanResponse,
            data: action.payload,
            success: true,
          },
        };
      case COUNSELOR_CAREER_SUCCESSION_PLAN_ERROR:
        return {
          ...state,
          counselorCareerSuccessionPlanResponse: {
            ...state.counselorCareerSuccessionPlanResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default counselorCareerSuccessionPlanReducer;