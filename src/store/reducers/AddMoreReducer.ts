import {
  POST_INDIVIDUAL_REGISTER_SUCCESS,
  POST_INDIVIDUAL_REGISTER_ERROR,
  POST_OTP_REGISTER_SUCCESS,
  POST_OTP_REGISTER_ERROR,
  GET_SALES_APP_CUSTOMER_DATA_SUCCESS,
  GET_SALES_APP_CUSTOMER_DATA_ERROR,
  POST_SALES_TRANSACTION_SUCCESS,
  POST_SALES_TRANSACTION_ERROR,
  GET_OFFERING_DETAIL_SUCCESS,
  GET_OFFERING_DETAIL_ERROR,
  GET_CARD_VALIDITY_SUCCESS,
  GET_CARD_VALIDITY_ERROR,
  DISABLE_TRANSACTION_SUCCESS,
  DISABLE_TRANSACTION_ERROR,
  GET_USER_STATE_LIST_SUCCESS,
  GET_USER_STATE_LIST_ERROR,
} from "../constants";

const initialState = {
  updateIndividualResponse: {
    data: {},
    success: false,
  },
  updateOtpResponse: {
    data: {},
    success: false,
  },
  userDataResponse: {
    data: {},
    success: false,
  },
  updateTransactionResponse: {
    data: {},
    success: false,
  },
  offeringResponse: {
    data: [],
    success: false,
  },
  cardResponse: {
    data: {},
    success: false,
  },
  disableTransactionResponse: {
    data: {},
    success: false,
  },
  getStateListResponse: {
    data: [],
    success: false,
  },
};

export const AddMoreReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_INDIVIDUAL_REGISTER_SUCCESS:
      return {
        ...state,
        updateIndividualResponse: {
          ...state.updateIndividualResponse,
          data: action.payload,
          success: true,
        },
      };

    case POST_INDIVIDUAL_REGISTER_ERROR:
      return {
        ...state,
        updateIndividualResponse: {
          ...state.updateIndividualResponse,
          data: action.payload,
          success: false,
        },
      };

    case POST_OTP_REGISTER_SUCCESS:
      return {
        ...state,
        updateOtpResponse: {
          ...state.updateOtpResponse,
          data: action.payload,
          success: true,
        },
      };

    case POST_OTP_REGISTER_ERROR:
      return {
        ...state,
        updateOtpResponse: {
          ...state.updateOtpResponse,
          data: action.payload,
          success: false,
        },
      };

    case POST_SALES_TRANSACTION_SUCCESS:
      return {
        ...state,
        updateTransactionResponse: {
          ...state.updateTransactionResponse,
          data: action.payload,
          success: true,
        },
      };

    case POST_SALES_TRANSACTION_ERROR:
      return {
        ...state,
        updateTransactionResponse: {
          ...state.updateTransactionResponse,
          data: action.payload,
          success: false,
        },
      };
    case GET_SALES_APP_CUSTOMER_DATA_SUCCESS:
      return {
        ...state,
        userDataResponse: {
          ...state.userDataResponse,
          data: action.payload,
          success: true,
        },
      };

    case GET_SALES_APP_CUSTOMER_DATA_ERROR:
      return {
        ...state,
        userDataResponse: {
          ...state.userDataResponse,
          data: action.payload,
          success: false,
        },
      };
    case GET_OFFERING_DETAIL_SUCCESS:
      return {
        ...state,
        offeringResponse: {
          ...state.offeringResponse,
          data: action.payload,
          success: true,
        },
      };

    case GET_OFFERING_DETAIL_ERROR:
      return {
        ...state,
        offeringResponse: {
          ...state.offeringResponse,
          data: action.payload,
          success: false,
        },
      };
    case GET_CARD_VALIDITY_SUCCESS:
      return {
        ...state,
        cardResponse: {
          ...state.cardResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_CARD_VALIDITY_ERROR:
      return {
        ...state,
        cardResponse: {
          ...state.cardResponse,
          data: action.payload,
          success: false,
        },
      };
    case DISABLE_TRANSACTION_SUCCESS:
      return {
        ...state,
        disableTransactionResponse: {
          ...state.disableTransactionResponse,
          data: action.payload,
          success: true,
        },
      };
    case DISABLE_TRANSACTION_ERROR:
      return {
        ...state,
        disableTransactionResponse: {
          ...state.disableTransactionResponse,
          data: action.payload,
          success: false,
        },
      };
    case GET_USER_STATE_LIST_SUCCESS:
      return {
        ...state,
        getStateListResponse: {
          ...state.getStateListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_USER_STATE_LIST_ERROR:
      return {
        ...state,
        getStateListResponse: {
          ...state.getStateListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
