import {
  GET_COLLEGE_EVENTDATES_SUCCESS,
  GET_COLLEGE_EVENTDATES_ERROR,
  POST_COLLEGE_EVENTDATES_ERROR,
  POST_COLLEGE_EVENTDATES_SUCCESS,
  PUT_COLLEGE_EVENTDATES_SUCCESS,
  PUT_COLLEGE_EVENTDATES_ERROR
  } from "../constants";

  const initialState = {
    collegeEventDatesResponse: {
      data: {},
    }
  };
  
  const getCollegeEventDatesReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COLLEGE_EVENTDATES_SUCCESS:
        return {
          ...state,
          collegeEventDatesResponse: {
            ...state.collegeEventDatesResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_COLLEGE_EVENTDATES_ERROR:
        return {
          ...state,
          collegeEventDatesResponse: {
            ...state.collegeEventDatesResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const postCollegeEventDatesReducer = (state = initialState, action) => {
    switch (action.type) {
     case POST_COLLEGE_EVENTDATES_SUCCESS:
          return {
            ...state,
            collegeEventDatesResponse: {
              ...state.collegeEventDatesResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case POST_COLLEGE_EVENTDATES_ERROR:
            return {
              ...state,
              collegeEventDatesResponse: {
                ...state.collegeEventDatesResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }

  const putCollegeEventDatesReducer = (state = initialState, action) => {
    switch (action.type) {
     case PUT_COLLEGE_EVENTDATES_SUCCESS:
          return {
            ...state,
            collegeEventDatesResponse: {
              ...state.collegeEventDatesResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case PUT_COLLEGE_EVENTDATES_ERROR:
            return {
              ...state,
              collegeEventDatesResponse: {
                ...state.collegeEventDatesResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }
  export { getCollegeEventDatesReducer, postCollegeEventDatesReducer, putCollegeEventDatesReducer };