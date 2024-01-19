import {
    GET_FEEDBACK_LIST
} from '../constants';

const initialState = {
    feedback: {
        list: [],
        count: 0,
        error: null
    }
};

const FeedbackListingReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_FEEDBACK_LIST: return ({
            ...state,
            feedback: action.payload
        });
        default: return (state);
    }
}

export default FeedbackListingReducer;