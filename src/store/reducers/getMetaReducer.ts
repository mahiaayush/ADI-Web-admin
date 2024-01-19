import {
    GET_META_SUCCESS,
    GET_META_ERROR,
} from "src/store/constants";

const initialState = {
    getMeta: {
        data: {},
    }
};

const getMetaReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_META_SUCCESS:
            return {
                ...state,
                getMeta: {
                    ...state.getMeta,
                    data: action.payload,
                    success: true,
                },

            };
        case GET_META_ERROR:
            return {
                ...state,
                getMeta: {
                    ...state.getMeta,
                    data: action.payload,
                    success: false,
                },
            };
        default:
            return state;
    }
};
export default getMetaReducer;