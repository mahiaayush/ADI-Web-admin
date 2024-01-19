import {
    CHANGE_INVENTORY_STATUS_SUCCESS,
    CHANGE_INVENTORY_STATUS_ERROR,
    GET_INVENTORY_LIST
} from '../constants';

const initialState = {
    inventories: {
        list: [],
        count: 0,
        error: null
    },
    inventoryStatusResponse: {
        data: {},
        success: false
    }
};

const inventoryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INVENTORY_LIST: return ({
            ...state,
            inventories: action.payload
        });
        case CHANGE_INVENTORY_STATUS_SUCCESS: return ({
            ...state,
            inventoryStatusResponse: {
            ...state.inventoryStatusResponse,
            data: action.payload,
            success: true,
            }
        })
        case CHANGE_INVENTORY_STATUS_ERROR: return ({
            ...state,
            inventoryStatusResponse: {
            ...state.inventoryStatusResponse,
            data: action.payload,
            success: false
            }
        })
        default: return (state);
    }
}

export default inventoryReducer;