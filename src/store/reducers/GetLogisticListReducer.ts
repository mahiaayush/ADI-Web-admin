import {
  GET_LOGISTIC_LIST_SUCCESS,
  GET_LOGISTIC_LIST_ERROR,
  GET_LOGISTIC_DETAIL_SUCCESS,
  GET_LOGISTIC_DETAIL_ERROR,
  GET_CARD_LOTS_SUCCESS,
  GET_CARD_LOTS_ERROR,
} from "src/store/constants";

const initialState = {
  getLogisticListResponse: {
    data: {},
  },
  getLogisticDetailResponse: {
    data: {},
  },
  getCardLotResponse: {
    data: {},
  },
};

const getLogisticListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOGISTIC_LIST_SUCCESS:
      return {
        ...state,
        getLogisticListResponse: {
          ...state.getLogisticListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_LOGISTIC_LIST_ERROR:
      return {
        ...state,
        getLogisticListResponse: {
          ...state.getLogisticListResponse,
          data: action.payload,
          success: false,
        },
      };
    case GET_LOGISTIC_DETAIL_SUCCESS:
      return {
        ...state,
        getLogisticDetailResponse: {
          ...state.getLogisticDetailResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_LOGISTIC_DETAIL_ERROR:
      return {
        ...state,
        getLogisticDetailResponse: {
          ...state.getLogisticDetailResponse,
          data: action.payload,
          success: false,
        },
      };
      case GET_CARD_LOTS_SUCCESS:
        return {
          ...state,
          getCardLotResponse: {
            ...state.getCardLotResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_CARD_LOTS_ERROR:
        return {
          ...state,
          getCardLotResponse: {
            ...state.getCardLotResponse,
            data: action.payload,
            success: false,
          },
        };
    default:
      return state;
  }
};
export default getLogisticListReducer;
