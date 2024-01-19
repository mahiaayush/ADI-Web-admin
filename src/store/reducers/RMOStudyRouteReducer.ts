import {
    GET_STUDY_ROUTE_SUCCESS,
    GET_STUDY_ROUTE_ERROR
    } from "../constants";
    
    const initialState = {
      StudyRouteResponse: {
        data: {},
      }
    };
    const getStudyRouteReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_STUDY_ROUTE_SUCCESS:
          return {
            ...state,
            StudyRouteResponse: {
              ...state.StudyRouteResponse,
              data: action.payload.data,
              success: true,
            },
          };
        case GET_STUDY_ROUTE_ERROR:
          return {
            ...state,
            StudyRouteResponse: {
              ...state.StudyRouteResponse,
              data: { rows: [] },
              success: false,
            },
          };
        default:
          return state;
      }
    };
    export { getStudyRouteReducer };