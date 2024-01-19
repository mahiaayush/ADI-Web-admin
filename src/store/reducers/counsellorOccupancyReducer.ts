import {
    GET_COUNSELLOR_OCCUPANCY_LIST
} from '../constants';

const initialState = {
    counsellorOccupancy: {
        list: [],
        count: 0,
        error: null
    }
};

const counsellorOccupancyReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_COUNSELLOR_OCCUPANCY_LIST: return ({
            ...state,
            counsellorOccupancy: action.payload
        });
        default: return (state);
    }
}

export default counsellorOccupancyReducer;