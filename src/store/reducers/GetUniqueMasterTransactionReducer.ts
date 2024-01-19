import { GET_UNIQUE_MASTER_TRANSACTION_SUCCESS, GET_UNIQUE_MASTER_TRANSACTION_ERROR } from "../constants";

const initialState = {
  getUniqueMasterTransactionResponse: {
    data: [],
  },
};

const GetUniqueMasterTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNIQUE_MASTER_TRANSACTION_SUCCESS:
      return {
        ...state,
        getUniqueMasterTransactionResponse: {
          ...state.getUniqueMasterTransactionResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_UNIQUE_MASTER_TRANSACTION_ERROR:
      return {
        ...state,
        getUniqueMasterTransactionResponse: {
          ...state.getUniqueMasterTransactionResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetUniqueMasterTransactionReducer;
