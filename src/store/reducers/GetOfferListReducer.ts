import { GET_OFFER_LIST_SUCCESS, GET_OFFER_LIST_ERROR } from "../constants";

const initialState = {
  getOfferListResponse: {
    data: [],
  },
};

const GetOfferListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_OFFER_LIST_SUCCESS:
      return {
        ...state,
        getOfferListResponse: {
          ...state.getOfferListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_OFFER_LIST_ERROR:
      return {
        ...state,
        getOfferListResponse: {
          ...state.getOfferListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetOfferListReducer;
