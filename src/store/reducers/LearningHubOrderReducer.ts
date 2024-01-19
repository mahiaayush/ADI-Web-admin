import {
    GET_LEARNING_HUB_ORDER_SUCCESS,
    GET_LEARNING_HUB_ORDER_ERROR
} from '../constants';

const orders = {
        data: [],
        error: null,
        status: false
};

const LearningHubOrderReducer = (state = orders, action: any) => {
    switch (action.type) {
        case GET_LEARNING_HUB_ORDER_SUCCESS: return ({
            ...state,
            data: action.payload,
            status: true
        });
        case GET_LEARNING_HUB_ORDER_ERROR: return ({
            ...state,
            data: action.payload,
            status: false
        });
        default: return (state);
    }
}

export default LearningHubOrderReducer;