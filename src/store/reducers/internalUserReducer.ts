import {
    GET_INTERNAL_USERS_LIST, GET_INTERNAL_USERS_DETAILS,
    ENABLE_INTERNAL_USER, DISABLE_INTERNAL_USER,
    GLOBAL_SIGNOUT_INTERNAL_USER, CREATE_INTERNAL_USER,
    INTERNAL_RESET_PASSWORD, UPDATE_INTERNAL_USER,
    INTERNAL_USER_AUTH_EVENTS,
} from '../constants';

const initialState = {
    internalUsers: {
        list: [],
        count: 0,
        error: null
    },
    userDetail: {
        detail: {},
        error: null
    },
    createUser: {
        success: null,
        error: null
    },
    enableUser: {
        success: null,
        error: null,
    },
    disableUser: {
        success: null,
        error: null,
    },
    internalResetPassword: {
        success: null,
        error: null,
    },
    globalSignOutUser: {
        success: null,
        error: null,
    },
    updateUser: {
        data: {},
        error: null
    },
    authEvents: {
        list: [],
        error: null,
    }
};

const internalUsersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_INTERNAL_USERS_LIST: return ({
            ...state,
            internalUsers: action.payload
        });
        case GET_INTERNAL_USERS_DETAILS: return ({
            ...state,
            userDetail: action.payload
        });
        case CREATE_INTERNAL_USER: return ({
            ...state,
            createUser: action.payload
        });
        case ENABLE_INTERNAL_USER: return ({
            ...state,
            enableUser: action.payload
        });
        case DISABLE_INTERNAL_USER: return ({
            ...state,
            disableUser: action.payload
        });
        case INTERNAL_RESET_PASSWORD: return ({
            ...state,
            internalResetPassword: action.payload
        });
        case GLOBAL_SIGNOUT_INTERNAL_USER: return ({
            ...state,
            globalSignOutUser: action.payload
        });
        case UPDATE_INTERNAL_USER: return ({
            ...state,
            updateUser: action.payload
        });
        case INTERNAL_USER_AUTH_EVENTS: return ({
            ...state,
            authEvents: action.payload
        });
        default: return (state);
    }
}

export default internalUsersReducer;