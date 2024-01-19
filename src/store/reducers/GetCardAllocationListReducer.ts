import { GET_CARD_ALLOCATION_LIST_SUCCESS, GET_CARD_ALLOCATION_LIST_ERROR } from "../constants";

const initialState = {
  getCardAllocationListResponse: {
    data: [],
  },
};

const GetCardAllocationListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CARD_ALLOCATION_LIST_SUCCESS:
      return {
        ...state,
        getCardAllocationListResponse: {
          ...state.getCardAllocationListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_CARD_ALLOCATION_LIST_ERROR:
      return {
        ...state,
        getCardAllocationListResponse: {
          ...state.getCardAllocationListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetCardAllocationListReducer;
