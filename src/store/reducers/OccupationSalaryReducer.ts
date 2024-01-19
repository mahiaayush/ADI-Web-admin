import {
    GET_OCCUPATIONSALARY_SUCCESS,
    GET_OCCUPATIONSALARY_ERROR,
} from "../constants";

const initialState = {
    OccupationSalaryResponse: {
        data: {},
    }
};

const OccupationSalaryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_OCCUPATIONSALARY_SUCCESS:
            return {
                ...state,
                OccupationSalaryResponse: {
                    ...state.OccupationSalaryResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_OCCUPATIONSALARY_ERROR:
            return {
                ...state,
                OccupationSalaryResponse: {
                    ...state.OccupationSalaryResponse,
                    data: { rows: [] },
                    success: false,
                },
            };
        default:
            return state;
    }
};
export default OccupationSalaryReducer;