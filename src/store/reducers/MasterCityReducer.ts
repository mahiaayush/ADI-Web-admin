import {
  GET_CITY_SUCCESS,
  GET_CITY_ERROR,
  GET_STATEID_LIST_SUCCESS,
  GET_STATEID_LIST_ERROR

} from "../constants";

const initialState = {
  cityResponse: {
    data: {},
  }
};

const CityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITY_SUCCESS:
      return {
        ...state,
        cityResponse: {
          ...state.cityResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_CITY_ERROR:
      return {
        ...state,
        cityResponse: {
          ...state.cityResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const stateId = {
  stateIdResponse: {
    data: {},
  }
};

const StateIdReducer = (state = stateId, action) => {
  switch (action.type) {
    case GET_STATEID_LIST_SUCCESS:
      return {
        ...state,
        stateIdResponse: {
          ...state.stateIdResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_STATEID_LIST_ERROR:
      return {
        ...state,
        stateIdResponse: {
          ...state.stateIdResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  CityReducer,
  StateIdReducer
}