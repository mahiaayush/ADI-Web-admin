import {
    GET_SESSION_LOGS
} from '../constants';

const initialState = {
    sessionLogs: {
        list: [],
        count: 0,
        error: null
    }
};

const sessionLogsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SESSION_LOGS: return ({
            ...state,
            sessionLogs: action.payload
        });
        default: return (state);
    }
}

export default sessionLogsReducer;