import { GET_SELLER_META_DATA_SUCCESS, GET_SELLER_META_DATA_ERROR } from "../constants";

const initialState = {
  getSellerMetaDataResponse: {
    data: [],
  },
};

const GetSellerMetaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_META_DATA_SUCCESS:
      return {
        ...state,
        getSellerMetaDataResponse: {
          ...state.getSellerMetaDataResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_SELLER_META_DATA_ERROR:
      return {
        ...state,
        getSellerMetaDataResponse: {
          ...state.getSellerMetaDataResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetSellerMetaDataReducer;
