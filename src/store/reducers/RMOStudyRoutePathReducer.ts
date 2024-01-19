import {
    GET_STUDY_ROUTE_PATH_SUCCESS,
    GET_STUDY_ROUTE_PATH_ERROR
    } from "../constants";
    
    const initialState = {
      StudyRoutePathResponse: {
        data: {},
      }
    };
    const getStudyRoutePathReducer = (state = initialState, action) => {
      switch (action.type) {
        case GET_STUDY_ROUTE_PATH_SUCCESS:
          return {
            ...state,
            StudyRoutePathResponse: {
              ...state.StudyRoutePathResponse,
              data: action.payload.data,
              success: true,
            },
          };
        case GET_STUDY_ROUTE_PATH_ERROR:
          return {
            ...state,
            StudyRoutePathResponse: {
              ...state.StudyRoutePathResponse,
              data: { rows: [] },
              success: false,
            },
          };
        default:
          return state;
      }
    };
    //
    export { getStudyRoutePathReducer };