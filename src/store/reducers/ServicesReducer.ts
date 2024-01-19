import {
    GET_SERVICES_SUCCESS,
    GET_SERVICES_ERROR,
} from "../constants";

const ServicesState = {
    ServicesResponse: {
        data: {},
    }
};
const getServicesReducer = (state = ServicesState, action) => {
    switch (action.type) {
        case GET_SERVICES_SUCCESS:
            return {
                ...state,
                ServicesResponse: {
                    ...state.ServicesResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_SERVICES_ERROR:
            return {
                ...state,
                ServicesResponse: {
                    ...state.ServicesResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
};
export {
    getServicesReducer
}