import {
  GET_COLLEGE_MASTER_SUCCESS,
  GET_COLLEGE_MASTER_ERROR,
  POST_COLLEGE_MASTER_ERROR,
  POST_COLLEGE_MASTER_SUCCESS,
  PUT_COLLEGE_MASTER_SUCCESS,
  PUT_COLLEGE_MASTER_ERROR
  } from "../constants";

  const initialState = {
    collegeMasterResponse: {
      data: {},
    }
  };
  
  const getCollegeMasterReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COLLEGE_MASTER_SUCCESS:
        return {
          ...state,
          collegeMasterResponse: {
            ...state.collegeMasterResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_COLLEGE_MASTER_ERROR:
        return {
          ...state,
          collegeMasterResponse: {
            ...state.collegeMasterResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const postCollegeMasterReducer = (state = initialState, action) => {
    switch (action.type) {
     case POST_COLLEGE_MASTER_SUCCESS:
          return {
            ...state,
            collegeMasterResponse: {
              ...state.collegeMasterResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case POST_COLLEGE_MASTER_ERROR:
            return {
              ...state,
              collegeMasterResponse: {
                ...state.collegeMasterResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }

  const putCollegeMasterReducer = (state = initialState, action) => {
    switch (action.type) {
     case PUT_COLLEGE_MASTER_SUCCESS:
          return {
            ...state,
            collegeMasterResponse: {
              ...state.collegeMasterResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case PUT_COLLEGE_MASTER_ERROR:
            return {
              ...state,
              collegeMasterResponse: {
                ...state.collegeMasterResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }
  export { getCollegeMasterReducer, postCollegeMasterReducer, putCollegeMasterReducer };