import {
  GET_SALSE_TRANSACTION_LIST
} from '../constants';

const initialState = {
  salesTransactionList: {
      list: [],
      count: 0,
      error: null
  }
};

const salesTransactionReducer = (state = initialState, action: any) => {
  switch (action.type) {
      case GET_SALSE_TRANSACTION_LIST: return ({
          ...state,
          salesTransactionList: action.payload
      });
      default: return (state);
  }
}

export default salesTransactionReducer;