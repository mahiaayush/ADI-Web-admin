import {
  GET_ACCOMODATIONTYPE_SUCCESS,
  GET_ACCOMODATIONTYPE_ERROR,
  GET_ACCOMODATION_TYPE_LIST_SUCCESS,
  GET_ACCOMODATION_TYPE_LIST_ERROR,
} from "../constants";

const initialState = {
  AccomodationTypeResponse: {
    data: {},
  }
};
const listState = {
  AccomodationTypeListResponse: {
    data: {},
  }
};
const AccomodationTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOMODATIONTYPE_SUCCESS:
      return {
        ...state,
        AccomodationTypeResponse: {
          ...state.AccomodationTypeResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACCOMODATIONTYPE_ERROR:
      return {
        ...state,
        AccomodationTypeResponse: {
          ...state.AccomodationTypeResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const AccomodationTypeListReducer = (state = listState, action) => {
  switch (action.type) {
    case GET_ACCOMODATION_TYPE_LIST_SUCCESS:
      return {
        ...state,
        AccomodationTypeListResponse: {
          ...state.AccomodationTypeListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACCOMODATION_TYPE_LIST_ERROR:
      return {
        ...state,
        AccomodationTypeListResponse: {
          ...state.AccomodationTypeListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  AccomodationTypeReducer,
  AccomodationTypeListReducer
};