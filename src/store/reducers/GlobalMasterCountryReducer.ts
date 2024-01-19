import {
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_ERROR,
} from "../constants";

const initialState = {
  countryResponse: {
    data: {},
  }
};

const GlobalMasterCountryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        countryResponse: {
          ...state.countryResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_COUNTRY_ERROR:
      return {
        ...state,
        countryResponse: {
          ...state.countryResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GlobalMasterCountryReducer;