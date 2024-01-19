import { GET_SELLER_DATA_SUCCESS, GET_SELLER_DATA_ERROR } from "../constants";

const initialState = {
  getSellerDataResponse: {
    data: [],
  },
};

const GetSellerDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_DATA_SUCCESS:
      return {
        ...state,
        getSellerDataResponse: {
          ...state.getSellerDataResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_SELLER_DATA_ERROR:
      return {
        ...state,
        getSellerDataResponse: {
          ...state.getSellerDataResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetSellerDataReducer;
