import {
    GET_DASHBOARD_STATUS_DATA_SUCCESS,
    GET_DASHBOARD_STATUS_DATA_ERROR,
    GET_ONBOARDING_STATUS_SUCCESS,
    GET_ONBOARDING_STATUS_ERROR,
    GET_ONBOARDING_STATUS_TRAINING_COUNT_SUCCESS,
    GET_ONBOARDING_STATUS_TRAINING_COUNT_ERROR,
    GET_ONBOARDING_STATUS_REMAINING_COUNT_SUCCESS,
    GET_ONBOARDING_STATUS_REMAINING_COUNT_ERROR
  } from "src/store/constants";
  
  const initialState = {
    dashboardStatusDataResponse: {
      data: {},
    },
    onBoardingStatusResponse: {
      data: {},
    },
    onBoardingTrainingStatusResponse: {
      data: {},
    },
    onBoardingRemainingStatusResponse: {
      data: {},
    },
  };
  
  const dashboardStatusDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DASHBOARD_STATUS_DATA_SUCCESS:
        return {
          ...state,
          dashboardStatusDataResponse: {
            ...state.dashboardStatusDataResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_DASHBOARD_STATUS_DATA_ERROR:
        return {
          ...state,
          dashboardStatusDataResponse: {
            ...state.dashboardStatusDataResponse,
            data: action.payload,
            success: false,
          },
        };
      case GET_ONBOARDING_STATUS_SUCCESS:
        return {
          ...state,
          onBoardingStatusResponse: {
            ...state.onBoardingStatusResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_ONBOARDING_STATUS_ERROR:
        return {
          ...state,
          onBoardingStatusResponse: {
            ...state.onBoardingStatusResponse,
            data: action.payload,
            success: false,
          },
        };
        case GET_ONBOARDING_STATUS_TRAINING_COUNT_SUCCESS:
          return {
            ...state,
            onBoardingTrainingStatusResponse: {
              ...state.onBoardingTrainingStatusResponse,
              data: action.payload,
              success: true,
            },
          };
        case GET_ONBOARDING_STATUS_TRAINING_COUNT_ERROR:
          return {
            ...state,
            onBoardingTrainingStatusResponse: {
              ...state.onBoardingTrainingStatusResponse,
              data: action.payload,
              success: false,
            },
          };
          case GET_ONBOARDING_STATUS_REMAINING_COUNT_SUCCESS:
            return {
              ...state,
              onBoardingRemainingStatusResponse: {
                ...state.onBoardingRemainingStatusResponse,
                data: action.payload,
                success: true,
              },
            };
          case GET_ONBOARDING_STATUS_REMAINING_COUNT_ERROR:
            return {
              ...state,
              onBoardingRemainingStatusResponse: {
                ...state.onBoardingRemainingStatusResponse,
                data: action.payload,
                success: false,
              },
            };
      default:
        return state;
    }
  };
  export default dashboardStatusDataReducer;