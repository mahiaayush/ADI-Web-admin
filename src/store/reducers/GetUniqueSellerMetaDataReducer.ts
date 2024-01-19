import { GET_UNIQUE_SELLER_META_DATA_SUCCESS, GET_UNIQUE_SELLER_META_DATA_ERROR } from "../constants";

const initialState = {
  getUniqueSellerMetaDataResponse: {
    data: [],
  },
};

const GetUniqueSellerMetaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNIQUE_SELLER_META_DATA_SUCCESS:
      return {
        ...state,
        getUniqueSellerMetaDataResponse: {
          ...state.getUniqueSellerMetaDataResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_UNIQUE_SELLER_META_DATA_ERROR:
      return {
        ...state,
        getUniqueSellerMetaDataResponse: {
          ...state.getUniqueSellerMetaDataResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetUniqueSellerMetaDataReducer;
