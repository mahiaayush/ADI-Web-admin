import {
    GET_OCCUPATION_QUALIFICATION_SUCCESS,
    GET_OCCUPATION_QUALIFICATION_ERROR,
    POST_OCCUPATION_QUALIFICATION_SUCCESS,
    POST_OCCUPATION_QUALIFICATION_ERROR,
    PUT_OCCUPATION_QUALIFICATION_SUCCESS,
    PUT_OCCUPATION_QUALIFICATION_ERROR,
    GET_OCCUPATION_QUALIFICATION_LIST_SUCCESS,
    GET_OCCUPATION_QUALIFICATION_LIST_ERROR
} from "../constants";

const initialState = {
    OccupationQualificationResponse: {
        data: {},
    }
};
const initialListState = {
    OccupationQualificationListResponse: {
        data: {},
    }
};
const getOccupationQualificationListReducer = (state = initialListState, action) => {
    switch (action.type) {
        case GET_OCCUPATION_QUALIFICATION_LIST_SUCCESS:
            return {
                ...state,
                OccupationQualificationListResponse: {
                    ...state.OccupationQualificationListResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_OCCUPATION_QUALIFICATION_LIST_ERROR:
            return {
                ...state,
                OccupationQualificationListResponse: {
                    ...state.OccupationQualificationListResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
};
const getOccupationQualificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OCCUPATION_QUALIFICATION_SUCCESS:
            return {
                ...state,
                OccupationQualificationResponse: {
                    ...state.OccupationQualificationResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_OCCUPATION_QUALIFICATION_ERROR:
            return {
                ...state,
                OccupationQualificationResponse: {
                    ...state.OccupationQualificationResponse,
                    data: { rows: [] },
                    success: false,
                },
            };
        default:
            return state;
    }
};
const postOccupationQualificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_OCCUPATION_QUALIFICATION_SUCCESS:
            return {
                ...state,
                OccupationQualificationResponse: {
                    ...state.OccupationQualificationResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case POST_OCCUPATION_QUALIFICATION_ERROR:
            return {
                ...state,
                OccupationQualificationResponse: {
                    ...state.OccupationQualificationResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
}

const putOccupationQualificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case PUT_OCCUPATION_QUALIFICATION_SUCCESS:
            return {
                ...state,
                OccupationQualificationResponse: {
                    ...state.OccupationQualificationResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case PUT_OCCUPATION_QUALIFICATION_ERROR:
            return {
                ...state,
                OccupationQualificationResponse: {
                    ...state.OccupationQualificationResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
}
//
export { getOccupationQualificationListReducer, getOccupationQualificationReducer, postOccupationQualificationReducer, putOccupationQualificationReducer };