import {
    GET_COUNSELLOR_STATS
} from '../constants';

const initialState = {
    counsellorsStats: {
        list: {},
        count: 0,
        error: null
    }
};

const CounsellorsStatsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COUNSELLOR_STATS: return ({
            ...state,
            counsellorsStats: action.payload
        });
        default: return (state);
    }
}

export default CounsellorsStatsReducer;