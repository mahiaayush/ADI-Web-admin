import {
  GET_EMPLOYMENT_STATUS_MASTER_SUCCESS,
  GET_EMPLOYMENT_STATUS_MASTER_ERROR,
  POST_EMPLOYMENT_STATUS_MASTER_SUCCESS,
  POST_EMPLOYMENT_STATUS_MASTER_ERROR,
  PUT_EMPLOYMENT_STATUS_MASTER_SUCCESS,
  PUT_EMPLOYMENT_STATUS_MASTER_ERROR,
  GET_EMPLOYMENT_STATUS_LIST_SUCCESS,
  GET_EMPLOYMENT_STATUS_LIST_ERROR
} from "../constants";

const initialState = {
  EmploymentStatusMasterResponse: {
    data: {},
  }
};
const listState = {
  EmploymentStatusListResponse: {
    data: {},
  }
};

const getEmploymentStatusListReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_EMPLOYMENT_STATUS_LIST_SUCCESS:
      return {
        ...state,
        EmploymentStatusListResponse: {
          ...state.EmploymentStatusListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EMPLOYMENT_STATUS_LIST_ERROR:
      return {
        ...state,
        EmploymentStatusListResponse: {
          ...state.EmploymentStatusListResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const getEmploymentStatusMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYMENT_STATUS_MASTER_SUCCESS:
      return {
        ...state,
        EmploymentStatusMasterResponse: {
          ...state.EmploymentStatusMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_EMPLOYMENT_STATUS_MASTER_ERROR:
      return {
        ...state,
        EmploymentStatusMasterResponse: {
          ...state.EmploymentStatusMasterResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postEmploymentStatusMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_EMPLOYMENT_STATUS_MASTER_SUCCESS:
      return {
        ...state,
        EmploymentStatusMasterResponse: {
          ...state.EmploymentStatusMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_EMPLOYMENT_STATUS_MASTER_ERROR:
      return {
        ...state,
        EmploymentStatusMasterResponse: {
          ...state.EmploymentStatusMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putEmploymentStatusMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_EMPLOYMENT_STATUS_MASTER_SUCCESS:
      return {
        ...state,
        EmploymentStatusMasterResponse: {
          ...state.EmploymentStatusMasterResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_EMPLOYMENT_STATUS_MASTER_ERROR:
      return {
        ...state,
        EmploymentStatusMasterResponse: {
          ...state.EmploymentStatusMasterResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

//
export { getEmploymentStatusMasterReducer, postEmploymentStatusMasterReducer, putEmploymentStatusMasterReducer, getEmploymentStatusListReducer };