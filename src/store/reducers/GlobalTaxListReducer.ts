import { GET_GLOBAL_TAX_LIST_SUCCESS, GET_GLOBAL_TAX_LIST_ERROR } from "../constants";

const initialState = {
  getGlobalTaxListResponse: {
    data: [],
  },
};

const GlobalTaxListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_TAX_LIST_SUCCESS:
      return {
        ...state,
        getGlobalTaxListResponse: {
          ...state.getGlobalTaxListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_GLOBAL_TAX_LIST_ERROR:
      return {
        ...state,
        getGlobalTaxListResponse: {
          ...state.getGlobalTaxListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GlobalTaxListReducer;
