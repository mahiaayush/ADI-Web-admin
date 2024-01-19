import {
    GET_MASTER_STATE_SUCCESS,
    GET_MASTER_STATE_ERROR,
    GET_MASTER_COUNTRY_LIST_SUCCESS,
    GET_MASTER_COUNTRY_LIST_ERROR,
  } from "../constants";
  
  const initialState = {
    MasterStateResponse: {
      data: {},
    }
  };

  const initialListState = {
    countryIdResponse: {
      data: {},
    }
  };
 
  const MasterStateReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_MASTER_STATE_SUCCESS:
        return {
          ...state,
          MasterStateResponse: {
            ...state.MasterStateResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_MASTER_STATE_ERROR:
        return {
          ...state,
          MasterStateResponse: {
            ...state.MasterStateResponse,
            data: { rows: [] },
            success: false,
          },
        };
      default:
        return state;
    }
  };
  const CountryIdReducer = (country = initialListState, action) => {
    switch (action.type) {
      case GET_MASTER_COUNTRY_LIST_SUCCESS:
        return {
          ...country,
          countryIdResponse: {
            ...country.countryIdResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_MASTER_COUNTRY_LIST_ERROR:
        return {
          ...country,
          countryIdResponse: {
            ...country.countryIdResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return country;
    }
  };
  //
  export { MasterStateReducer, CountryIdReducer };