import {
  GET_SUBJECT_MASTER_SUCCESS,
  GET_SUBJECT_MASTER_ERROR,
  POST_SUBJECT_MASTER_SUCCESS,
  POST_SUBJECT_MASTER_ERROR,
  PUT_SUBJECT_MASTER_SUCCESS,
  PUT_SUBJECT_MASTER_ERROR,
  GET_SUBJECT_MASTER_LIST_SUCCESS,
  GET_SUBJECT_MASTER_LIST_ERROR
} from "../constants";

const initialState = {
  SubjectMasterResponse: {
    data: {},
  }
};
const initialListState = {
  SubjectMasterListResponse: {
    data: {},
  }
};
const getSubjectMasterListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case GET_SUBJECT_MASTER_LIST_SUCCESS:
      return {
        ...state,
        SubjectMasterListResponse: {
          ...state.SubjectMasterListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_SUBJECT_MASTER_LIST_ERROR:
      return {
        ...state,
        SubjectMasterListResponse: {
          ...state.SubjectMasterListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};

const getSubjectMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBJECT_MASTER_SUCCESS:
      return {
        ...state,
        SubjectMasterResponse: {
          ...state.SubjectMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_SUBJECT_MASTER_ERROR:
      return {
        ...state,
        SubjectMasterResponse: {
          ...state.SubjectMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postSubjectMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SUBJECT_MASTER_SUCCESS:
      return {
        ...state,
        SubjectMasterResponse: {
          ...state.SubjectMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_SUBJECT_MASTER_ERROR:
      return {
        ...state,
        SubjectMasterResponse: {
          ...state.SubjectMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putSubjectMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_SUBJECT_MASTER_SUCCESS:
      return {
        ...state,
        SubjectMasterResponse: {
          ...state.SubjectMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_SUBJECT_MASTER_ERROR:
      return {
        ...state,
        SubjectMasterResponse: {
          ...state.SubjectMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

export { getSubjectMasterReducer, getSubjectMasterListReducer, postSubjectMasterReducer, putSubjectMasterReducer };