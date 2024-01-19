import {
  GET_ACCREDIATION_MASTER_SUCCESS,
  GET_ACCREDIATION_MASTER_ERROR,
  POST_ACCREDIATION_MASTER_SUCCESS,
  POST_ACCREDIATION_MASTER_ERROR,
  PUT_ACCREDIATION_MASTER_SUCCESS,
  PUT_ACCREDIATION_MASTER_ERROR,
  GET_ACCREDIATION_MASTER_LIST_SUCCESS,
  GET_ACCREDIATION_MASTER_LIST_ERROR
} from "../constants";

const initialState = {
  AccrediationMasterResponse: {
    data: {},
  }
};
const listState = {
  AccrediationMasterListResponse: {
    data: {},
  }
};
const getAccrediationMasterListReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_ACCREDIATION_MASTER_LIST_SUCCESS:
      return {
        ...state,
        AccrediationMasterListResponse: {
          ...state.AccrediationMasterListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACCREDIATION_MASTER_LIST_ERROR:
      return {
        ...state,
        AccrediationMasterListResponse: {
          ...state.AccrediationMasterListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const getAccrediationMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCREDIATION_MASTER_SUCCESS:
      return {
        ...state,
        AccrediationMasterResponse: {
          ...state.AccrediationMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACCREDIATION_MASTER_ERROR:
      return {
        ...state,
        AccrediationMasterResponse: {
          ...state.AccrediationMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postAccrediationMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ACCREDIATION_MASTER_SUCCESS:
      return {
        ...state,
        AccrediationMasterResponse: {
          ...state.AccrediationMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_ACCREDIATION_MASTER_ERROR:
      return {
        ...state,
        collegeMasterResponse: {
          ...state.AccrediationMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putAccrediationMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_ACCREDIATION_MASTER_SUCCESS:
      return {
        ...state,
        AccrediationMasterResponse: {
          ...state.AccrediationMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_ACCREDIATION_MASTER_ERROR:
      return {
        ...state,
        AccrediationMasterResponse: {
          ...state.AccrediationMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

//
export {
  getAccrediationMasterListReducer,
  getAccrediationMasterReducer,
  postAccrediationMasterReducer,
  putAccrediationMasterReducer
};