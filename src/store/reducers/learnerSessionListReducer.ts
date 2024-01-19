import {
    GET_LEARNER_SESSION_LIST
} from '../constants';

const initialState = {
    learnerSessions: {
        list: [],
        count: 0,
        error: null
    }
};

const learnerSessionsListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_LEARNER_SESSION_LIST: return ({
            ...state,
            learnerSessions: action.payload
        });
        default: return (state);
    }
}

export default learnerSessionsListReducer;