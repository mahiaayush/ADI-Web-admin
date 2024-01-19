import {
    GET_SESSION_LIST,
    GET_RUNNING_SESSIONS
} from '../constants';

const initialState = {
    sessions: {
        list: [],
        count: 0,
        error: null
    },
    runningSessions: null
};

const sessionsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SESSION_LIST: return ({
            ...state,
            sessions: action.payload
        });
        case GET_RUNNING_SESSIONS: return ({
            ...state,
            runningSessions: action.payload
        });
        default: return (state);
    }
}

export default sessionsReducer;