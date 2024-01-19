import {
  GET_API_MASTER_SUCCESS,
  GET_API_MASTER_ERROR,

  POST_API_MASTER_ERROR,
  POST_API_MASTER_SUCCESS,
  PUT_API_MASTER_SUCCESS,
  PUT_API_MASTER_ERROR
  } from "../constants";

  const initialState = {
    apiMasterResponse: {
      data: {},
    }
  };
  
  const getApiMasterReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_API_MASTER_SUCCESS:
        return {
          ...state,
          apiMasterResponse: {
            ...state.apiMasterResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_API_MASTER_ERROR:
        return {
          ...state,
          apiMasterResponse: {
            ...state.apiMasterResponse,
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
     case POST_API_MASTER_SUCCESS:
          return {
            ...state,
            apiMasterResponse: {
              ...state.apiMasterResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case POST_API_MASTER_ERROR:
            return {
              ...state,
              apiMasterResponse: {
                ...state.apiMasterResponse,
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
     case PUT_API_MASTER_SUCCESS:
          return {
            ...state,
            apiMasterResponse: {
              ...state.apiMasterResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case PUT_API_MASTER_ERROR:
            return {
              ...state,
              apiMasterResponse: {
                ...state.apiMasterResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }
  export { getApiMasterReducer, postCollegeMasterReducer, putCollegeMasterReducer };