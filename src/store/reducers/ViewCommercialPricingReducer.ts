import { GET_COMMERCIAL_SUCCESS, GET_COMMERCIAL_ERROR } from "../constants";

const initialState = {
  viewCommercialPricing: {
    data: [],
  },
};

const ViewCommercialPricingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMERCIAL_SUCCESS:
      return {
        ...state,
        viewCommercialPricing: {
          ...state.viewCommercialPricing,
          data: action.payload,
          success: true,
        },
      };
    case GET_COMMERCIAL_ERROR:
      return {
        ...state,
        viewCommercialPricing: {
          ...state.viewCommercialPricing,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default ViewCommercialPricingReducer;
