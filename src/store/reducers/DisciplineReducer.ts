import {
    GET_DISCIPLINE_SUCCESS,
    GET_DISCIPLINE_ERROR,
    GET_DISCIPLINE_LIST_SUCCESS,
    GET_DISCIPLINE_LIST_ERROR,
} from "../constants";

const initialState = {
    disciplineResponse: {
        data: {},
    }
};
const DisciplineListState = {
    disciplineListResponse: {
        data: {},
    }
};

const DisciplineListReducer = (state = DisciplineListState, action) => {
    switch (action.type) {
        case GET_DISCIPLINE_LIST_SUCCESS:
            return {
                ...state,
                disciplineListResponse: {
                    ...state.disciplineListResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_DISCIPLINE_LIST_ERROR:
            return {
                ...state,
                disciplineListResponse: {
                    ...state.disciplineListResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
};

const DisciplineReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DISCIPLINE_SUCCESS:
            return {
                ...state,
                disciplineResponse: {
                    ...state.disciplineResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_DISCIPLINE_ERROR:
            return {
                ...state,
                disciplineResponse: {
                    ...state.disciplineResponse,
                    data: { rows: [] },
                    success: false,
                },
            };
        default:
            return state;
    }
};
export {
    DisciplineReducer,
    DisciplineListReducer
}