import {
    GET_SELECTED_COUNSELLOR_LIST
} from '../constants';

const initialState = {
    counsellors: {
        list: [],
        count: 0,
        error: null
    }
};

const SelectedCounsellorListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_SELECTED_COUNSELLOR_LIST: return ({
            ...state,
            counsellors: action.payload
        });
        default: return (state);
    }
}

export default SelectedCounsellorListReducer;