import {
    GET_SELECTED_COUNSELLOR_STATS
} from '../constants';

const initialState = {
    counsellorStats: {
        list: {},
        count: 0,
        error: null
    }
};

const CounsellorStatsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SELECTED_COUNSELLOR_STATS: return ({
            ...state,
            counsellorStats: action.payload
        });
        default: return (state);
    }
}

export default CounsellorStatsReducer;