import {
    SAVE_META_SUCCESS,
    SAVE_META_ERROR,
} from "src/store/constants";

const initialState = {
    saveMeta: {
        data: {},
    }
};

const saveMetaReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_META_SUCCESS:
            return {
                ...state,
                saveMeta: {
                    ...state.saveMeta,
                    data: action.payload,
                    success: true,
                },
            };
        case SAVE_META_ERROR:
            return {
                ...state,
                saveMeta: {
                    ...state.saveMeta,
                    data: action.payload,
                    success: false,
                },
            };
        default:
            return state;
    }
};
export default saveMetaReducer;
