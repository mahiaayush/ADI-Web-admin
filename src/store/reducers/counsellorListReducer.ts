import {
    GET_COUNSELLOR_LIST, GET_COUNSELLOR_LIST_ALL
} from '../constants';

const initialState = {
    counsellors: {
        list: [],
        count: 0,
        error: null
    },
    Allcounsellors: {
        list: [],
        count: 0,
        error: null
    }
};

const counsellorsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COUNSELLOR_LIST: return ({
            ...state,
            counsellors: action.payload
        });
        case GET_COUNSELLOR_LIST_ALL: return ({
            ...state,
            Allcounsellors: action.payload
        });
        default: return (state);
    }
}

export default counsellorsReducer;