import {
    GET_LEARNING_HUB_ORDER_DETAIL_SUCCESS,
    GET_LEARNING_HUB_ORDER_DETAIL_ERROR
} from '../constants';

const initialState = {
    orderResponse: {
      data: {},
    },
  };
const OrderDetailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_LEARNING_HUB_ORDER_DETAIL_SUCCESS: return ({
            ...state,
            orderResponse: {
                ...state.orderResponse,
                data: action.payload,
                status: true
              }
        });
        case GET_LEARNING_HUB_ORDER_DETAIL_ERROR: return ({
            ...state,
            orderResponse: {
                ...state.orderResponse,
                data: action.payload,
                status: false
              }
        });
        default:
            return state;
    }
}

export default OrderDetailReducer;