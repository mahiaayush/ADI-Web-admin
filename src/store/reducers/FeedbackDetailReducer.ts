import {
    GET_FEEDBACK_DETAILS,
} from '../constants';

const initialState = {
    feedback: {
       data: {},
       message: ''
    }
};

const FeedbackDetailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_FEEDBACK_DETAILS: 
        return ({
            ...state,
            feedback: action.payload
        });
        default: return (state);
    }
}

export default FeedbackDetailReducer;