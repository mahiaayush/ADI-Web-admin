import {
    GET_MASTER_EXAMINATION_SUCCESS,
    GET_MASTER_EXAMINATION_ERROR,
    POST_MASTER_EXAMINATION_SUCCESS,
    POST_MASTER_EXAMINATION_ERROR,
    PUT_MASTER_EXAMINATION_SUCCESS,
    PUT_MASTER_EXAMINATION_ERROR,
    GET_MASTER_EXAMINATION_LIST_SUCCESS,
    GET_MASTER_EXAMINATION_LIST_ERROR
} from "../constants";

const initialState = {
    MasterExaminationResponse: {
        data: {},
    }
};
const initialListState = {
    MasterExaminationListResponse: {
        data: {},
    }
};
const getMasterExaminationListReducer = (state = initialListState, action) => {
    switch (action.type) {
        case GET_MASTER_EXAMINATION_LIST_SUCCESS:
            return {
                ...state,
                MasterExaminationListResponse: {
                    ...state.MasterExaminationListResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_MASTER_EXAMINATION_LIST_ERROR:
            return {
                ...state,
                MasterExaminationListResponse: {
                    ...state.MasterExaminationListResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
};
const getMasterExaminationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MASTER_EXAMINATION_SUCCESS:
            return {
                ...state,
                MasterExaminationResponse: {
                    ...state.MasterExaminationResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_MASTER_EXAMINATION_ERROR:
            return {
                ...state,
                MasterExaminationResponse: {
                    ...state.MasterExaminationResponse,
                    data: { rows: [] },
                    success: false,
                },
            };
        default:
            return state;
    }
};
const postMasterExaminationReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_MASTER_EXAMINATION_SUCCESS:
            return {
                ...state,
                MasterExaminationResponse: {
                    ...state.MasterExaminationResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case POST_MASTER_EXAMINATION_ERROR:
            return {
                ...state,
                MasterExaminationResponse: {
                    ...state.MasterExaminationResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
}

const putMasterExaminationReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUT_MASTER_EXAMINATION_SUCCESS:
            return {
                ...state,
                MasterExaminationResponse: {
                    ...state.MasterExaminationResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case PUT_MASTER_EXAMINATION_ERROR:
            return {
                ...state,
                MasterExaminationResponse: {
                    ...state.MasterExaminationResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
}
//
export { getMasterExaminationListReducer, getMasterExaminationReducer, postMasterExaminationReducer, putMasterExaminationReducer };