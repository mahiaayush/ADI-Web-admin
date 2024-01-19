import {
    GET_LEARNERS_LIST
} from '../constants';

const initialState = {
    learners: {
        list: [],
        count: 0,
        error: null
    }
};

const learnersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_LEARNERS_LIST: return ({
            ...state,
            learners: action.payload
        });
        default: return (state);
    }
}

export default learnersReducer;