import {
    GET_OCCUPATIONCOURSE_SUCCESS,
    GET_OCCUPATIONCOURSE_ERROR,
  } from "../constants";
  
  const initialState = {
    OccupationCourseResponse: {
      data: {},
    }
  };
  
  const OccupationCourseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_OCCUPATIONCOURSE_SUCCESS:
        return {
          ...state,
          OccupationCourseResponse: {
            ...state.OccupationCourseResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_OCCUPATIONCOURSE_ERROR:
        return {
          ...state,
          OccupationCourseResponse: {
            ...state.OccupationCourseResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default OccupationCourseReducer;