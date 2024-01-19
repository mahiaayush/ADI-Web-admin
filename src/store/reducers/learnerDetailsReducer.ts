import {
    GET_DASHBOARD_LEARNER_DETAILS
} from '../constants';

const initialState = {
    learnersDetails: {
        list: [],
        count: 0,
        error: null
    }
};

const learnersDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_DASHBOARD_LEARNER_DETAILS: return ({
            ...state,
            learnersDetails: action.payload
        });
        default: return (state);
    }
}

export default learnersDetailsReducer;