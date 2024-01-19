import { GET_MASTER_TRANSACTION_SUCCESS, GET_MASTER_TRANSACTION_ERROR } from "../constants";

const initialState = {
  getMasterTransactionResponse: {
    data: [],
  },
};

const GetMasterTransactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASTER_TRANSACTION_SUCCESS:
      return {
        ...state,
        getMasterTransactionResponse: {
          ...state.getMasterTransactionResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_MASTER_TRANSACTION_ERROR:
      return {
        ...state,
        getMasterTransactionResponse: {
          ...state.getMasterTransactionResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetMasterTransactionReducer;
