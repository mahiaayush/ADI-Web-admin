import {
    GET_TRANSACTION_DETAILS
} from '../constants';

const initialState = {
    transDetails: {
        list: [],
        count: 0,
        error: null
    }
};

const transactionDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_TRANSACTION_DETAILS: return ({
            ...state,
            transDetails: action.payload
        });
        default: return (state);
    }
}

export default transactionDetailsReducer;