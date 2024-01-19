import {
    GET_DASHBOARD_LEARNER_LIST
} from '../constants';

const initialState = {
    dashboardlearners: {
        list: [],
        count: 0,
        error: null
    }
};

const dashboardSessionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DASHBOARD_LEARNER_LIST: return ({
            ...state,
            dashboardlearners: action.payload
        });
        default: return (state);
    }
}

export default dashboardSessionReducer;