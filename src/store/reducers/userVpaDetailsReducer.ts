import {
    GET_USER_VPA_DETAILS
} from '../constants';

const initialState = {
    userVpaDetails: {
        list: [],
        count: 0,
        error: null
    }
};

const userVpaDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_USER_VPA_DETAILS: return ({
            ...state,
            userVpaDetails: action.payload
        });
        default: return (state);
    }
}

export default userVpaDetailsReducer;