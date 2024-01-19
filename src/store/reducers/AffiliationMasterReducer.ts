import {
  GET_AFFILIATION_MASTER_SUCCESS,
  GET_AFFILIATION_MASTER_ERROR,
  POST_AFFILIATION_MASTER_SUCCESS,
  POST_AFFILIATION_MASTER_ERROR,
  PUT_AFFILIATION_MASTER_SUCCESS,
  PUT_AFFILIATION_MASTER_ERROR
} from "../constants";

const initialState = {
  AffiliationMasterResponse: {
    data: {},
  }
};

const getAffiliationMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AFFILIATION_MASTER_SUCCESS:
      return {
        ...state,
        AffiliationMasterResponse: {
          ...state.AffiliationMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_AFFILIATION_MASTER_ERROR:
      return {
        ...state,
        AffiliationMasterResponse: {
          ...state.AffiliationMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postAffiliationMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_AFFILIATION_MASTER_SUCCESS:
      return {
        ...state,
        AffiliationMasterResponse: {
          ...state.AffiliationMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_AFFILIATION_MASTER_ERROR:
      return {
        ...state,
        AffiliationMasterResponse: {
          ...state.AffiliationMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putAffiliationMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_AFFILIATION_MASTER_SUCCESS:
      return {
        ...state,
        AffiliationMasterResponse: {
          ...state.AffiliationMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_AFFILIATION_MASTER_ERROR:
      return {
        ...state,
        AffiliationMasterResponse: {
          ...state.AffiliationMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

export { getAffiliationMasterReducer, postAffiliationMasterReducer, putAffiliationMasterReducer };