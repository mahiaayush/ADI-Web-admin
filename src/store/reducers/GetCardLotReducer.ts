import { CARD_LOT_SUCCESS, CARD_LOT_ERROR } from "../constants";

const initialState = {
  getCardLotResponse: {
    data: [],
  },
};

const GetCardLotReducer = (state = initialState, action) => {
  switch (action.type) {
    case CARD_LOT_SUCCESS:
      return {
        ...state,
        getCardLotResponse: {
          ...state.getCardLotResponse,
          data: action.payload,
          success: true,
        },
      };
    case CARD_LOT_ERROR:
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
export default GetCardLotReducer;
