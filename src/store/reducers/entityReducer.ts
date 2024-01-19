import {
    GET_ENTITY_LIST, GET_ENTITY_DETAILS, SET_ENTITY_STATUS, GET_ENTITY_FILTER_LIST
} from '../constants';

const initialState = {
    entities: {
        list: [],
        count: 0,
        error: null
    },
    entity: {
        detail: {},
        error: null
    },
    status: {
        verify: {},
        error: null
    },
    filterList: {
        filterListitems: {},
        error: null
    }
};

const entityReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_ENTITY_LIST: return ({
            ...state,
            entities: action.payload
        });
        case GET_ENTITY_DETAILS: return ({
            ...state,
            entity: action.payload
        });
        case SET_ENTITY_STATUS: return ({
            ...state,
            status: action.payload
        });
        case GET_ENTITY_FILTER_LIST: return ({
            ...state,
            filterList: action.payload
        });
        default: return (state);
    }
}

export default entityReducer;