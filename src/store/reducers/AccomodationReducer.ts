import {
  GET_ACCOMODATION_SUCCESS,
  GET_ACCOMODATION_ERROR,
  POST_ACCOMODATION_ERROR,
  POST_ACCOMODATION_SUCCESS,
  PUT_ACCOMODATION_SUCCESS,
  PUT_ACCOMODATION_ERROR,
  GET_ACCOMODATION_TYPE_ERROR,
  GET_ACCOMODATION_TYPE_SUCCESS
} from "../constants";

const initialState = {
  AccomodationResponse: {
    data: {},
  }
};

const startState = {
  AccomodationTypeResponse: {
    data: {},
  },
}
const getAccomodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCOMODATION_SUCCESS:
      return {
        ...state,
        AccomodationResponse: {
          ...state.AccomodationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACCOMODATION_ERROR:
      return {
        ...state,
        AccomodationResponse: {
          ...state.AccomodationResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postAccomodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ACCOMODATION_SUCCESS:
      return {
        ...state,
        AccomodationResponse: {
          ...state.AccomodationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_ACCOMODATION_ERROR:
      return {
        ...state,
        collegeMasterResponse: {
          ...state.AccomodationResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putAccomodationReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_ACCOMODATION_SUCCESS:
      return {
        ...state,
        AccomodationResponse: {
          ...state.AccomodationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_ACCOMODATION_ERROR:
      return {
        ...state,
        AccomodationResponse: {
          ...state.AccomodationResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}
//
export { getAccomodationReducer, postAccomodationReducer, putAccomodationReducer };