import {
  GET_OCCUPATION_SUCCESS,
  GET_OCCUPATION_ERROR,
  GET_OCCUPATION_LIST_SUCCESS,
  GET_OCCUPATION_LIST_ERROR
} from "../constants";

const initialState = {
  OccpationResponse: {
    data: {},
  }
};
const ListState = {
  RMOccupationListResponse: {
    data: {},
  }
};
const OccupationListReducer = (state = ListState, action) => {
  switch (action.type) {
    case GET_OCCUPATION_LIST_SUCCESS:
      return {
        ...state,
        OccupationListResponse: {
          ...state.RMOccupationListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_OCCUPATION_LIST_ERROR:
      return {
        ...state,
        OccupationListResponse: {
          ...state.RMOccupationListResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};

const OccupationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OCCUPATION_SUCCESS:
      return {
        ...state,
        OccpationResponse: {
          ...state.OccpationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_OCCUPATION_ERROR:
      return {
        ...state,
        OccpationResponse: {
          ...state.OccpationResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};

export { OccupationReducer, OccupationListReducer }