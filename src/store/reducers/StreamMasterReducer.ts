import {
  GET_STREAM_MASTER_SUCCESS,
  GET_STREAM_MASTER_ERROR,
  POST_STREAM_MASTER_SUCCESS,
  POST_STREAM_MASTER_ERROR,
  PUT_STREAM_MASTER_SUCCESS,
  PUT_STREAM_MASTER_ERROR,
  GET_STREAM_MASTER_LIST_SUCCESS,
  GET_STREAM_MASTER_LIST_ERROR
} from "../constants";

const initialState = {
  StreamMasterResponse: {
    data: {},
  }
};
const initialListState = {
  StreamMasterListResponse: {
    data: {},
  }
};

const getStreamMasterListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GET_STREAM_MASTER_LIST_SUCCESS:
      return {
        ...state,
        StreamMasterListResponse: {
          ...state.StreamMasterListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_STREAM_MASTER_LIST_ERROR:
      return {
        ...state,
        StreamMasterListResponse: {
          ...state.StreamMasterListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const getStreamMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STREAM_MASTER_SUCCESS:
      return {
        ...state,
        StreamMasterResponse: {
          ...state.StreamMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_STREAM_MASTER_ERROR:
      return {
        ...state,
        StreamMasterResponse: {
          ...state.StreamMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postStreamMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_STREAM_MASTER_SUCCESS:
      return {
        ...state,
        StreamMasterResponse: {
          ...state.StreamMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_STREAM_MASTER_ERROR:
      return {
        ...state,
        StreamMasterResponse: {
          ...state.StreamMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putStreamMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_STREAM_MASTER_SUCCESS:
      return {
        ...state,
        StreamMasterResponse: {
          ...state.StreamMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_STREAM_MASTER_ERROR:
      return {
        ...state,
        StreamMasterResponse: {
          ...state.StreamMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

export { getStreamMasterListReducer, getStreamMasterReducer, postStreamMasterReducer, putStreamMasterReducer };