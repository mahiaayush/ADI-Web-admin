import {
    GET_RANK_SUCCESS,
    GET_RANK_ERROR,
} from "../constants";

const initialState = {
    rankResponse: {
        data: {},
    }
};

const RankReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RANK_SUCCESS:
            return {
                ...state,
                rankResponse: {
                    ...state.rankResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_RANK_ERROR:
            return {
                ...state,
                rankResponse: {
                    ...state.rankResponse,
                    data: { rows: [] },
                    success: false,
                },
            };
        default:
            return state;
    }
};
export default RankReducer;