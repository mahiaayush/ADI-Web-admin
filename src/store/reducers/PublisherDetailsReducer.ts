import {
  GET_PUBLISH_DETAILS_SUCCESS,
  GET_PUBLISH_DETAILS_ERROR,
  POST_PUBLISH_DETAILS_SUCCESS,
  POST_PUBLISH_DETAILS_ERROR,
  PUT_PUBLISH_DETAILS_SUCCESS,
  PUT_PUBLISH_DETAILS_ERROR
} from "../constants";

const initialState = {
  PublisherDetailsResponse: {
    data: {},
  }
};

const getPublisherDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PUBLISH_DETAILS_SUCCESS:
      return {
        ...state,
        PublisherDetailsResponse: {
          ...state.PublisherDetailsResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_PUBLISH_DETAILS_ERROR:
      return {
        ...state,
        PublisherDetailsResponse: {
          ...state.PublisherDetailsResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postPublisherDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PUBLISH_DETAILS_SUCCESS:
      return {
        ...state,
        PublisherDetailsResponse: {
          ...state.PublisherDetailsResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_PUBLISH_DETAILS_ERROR:
      return {
        ...state,
        PublisherDetailsResponse: {
          ...state.PublisherDetailsResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putPublisherDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_PUBLISH_DETAILS_SUCCESS:
      return {
        ...state,
        PublisherDetailsResponse: {
          ...state.PublisherDetailsResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_PUBLISH_DETAILS_ERROR:
      return {
        ...state,
        PublisherDetailsResponse: {
          ...state.PublisherDetailsResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}
//
export { getPublisherDetailsReducer, postPublisherDetailsReducer, putPublisherDetailsReducer };