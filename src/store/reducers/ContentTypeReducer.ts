import {
  GET_CONTENT_TYPE_SUCCESS,
  GET_CONTENT_TYPE_ERROR,
  POST_CONTENT_TYPE_ERROR,
  POST_CONTENT_TYPE_SUCCESS,
  PUT_CONTENT_TYPE_SUCCESS,
  PUT_CONTENT_TYPE_ERROR,
  GET_CONTENT_TYPE_LIST_SUCCESS,
  GET_CONTENT_TYPE_LIST_ERROR
  } from "../constants";

  const initialState = {
    ContentTypeResponse: {
      data: {},
    }
  };
  const initialListState = {
    ContentTypeListResponse: {
      data: {},
    }
  };
  const getContentTypeListReducer = (state = initialListState, action) => {
    switch (action.type) {
      case GET_CONTENT_TYPE_LIST_SUCCESS:
        return {
          ...state,
          ContentTypeListResponse: {
            ...state.ContentTypeListResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_CONTENT_TYPE_LIST_ERROR:
        return {
          ...state,
          ContentTypeListResponse: {
            ...state.ContentTypeListResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const getContentTypeReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CONTENT_TYPE_SUCCESS:
        return {
          ...state,
          ContentTypeResponse: {
            ...state.ContentTypeResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_CONTENT_TYPE_ERROR:
        return {
          ...state,
          ContentTypeResponse: {
            ...state.ContentTypeResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const postContentTypeReducer = (state = initialState, action) => {
    switch (action.type) {
     case POST_CONTENT_TYPE_SUCCESS:
          return {
            ...state,
            ContentTypeResponse: {
              ...state.ContentTypeResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case POST_CONTENT_TYPE_ERROR:
            return {
              ...state,
              ContentTypeResponse: {
                ...state.ContentTypeResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }

  const putContentTypeReducer = (state = initialState, action) => {
    switch (action.type) {
     case PUT_CONTENT_TYPE_SUCCESS:
          return {
            ...state,
            ContentTypeResponse: {
              ...state.ContentTypeResponse,
              data: action.payload.data,
              success: true,
            },
          };
          case PUT_CONTENT_TYPE_ERROR:
            return {
              ...state,
              ContentTypeResponse: {
                ...state.ContentTypeResponse,
                data: action.payload.data,
                success: false,
              },
            };
      default:
        return state;
    }
  }
  //
  export { getContentTypeListReducer, getContentTypeReducer, postContentTypeReducer, putContentTypeReducer };