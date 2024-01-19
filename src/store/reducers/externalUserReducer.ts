import {
    GET_EXTERNAL_USER_LIST, GET_EXTERNAL_USER_DETAILS,
    ENABLE_EXTERNAL_USER, DISABLE_EXTERNAL_USER,
    GLOBAL_SIGNOUT_EXTERNAL_USER, CREATE_EXTERNAL_USER,
    EXTERNAL_RESET_PASSWORD, GET_EXTERNAL_USER_ENTITIES,
    EXTERNAL_UNLINK_ENTITY, EXTERNAL_ADD_LINKED_ACCOUNTS,
    UPDATE_EXTERNAL_USER, EXTERNAL_USER_AUTH_EVENTS,
} from '../constants';

const initialState = {
    externalUsers: {
        paginationToken: [null],
        list: [],
        count: 0,
        error: null,
        limit: 10,
    },
    userDetail: {
        detail: {},
        error: null
    },
    createUser: {
        success: null,
        error: null,
    },
    enableUser: {
        success: null,
        error: null,
    },
    disableUser: {
        success: null,
        error: null,
    },
    externalResetPassword: {
        success: null,
        error: null,
    },
    globalSignOutUser: {
        success: null,
        error: null,
    },
    updateUser: {
        data: {}
    },
    userEntities: {
        list: [],
        error: null,
    },
    unlinkEntity: {
        success: null,
        error: null,
    },
    addLinkedAccounts: {
        success: null,
        error: null,
    },
    authEvents: {
        list: [],
        error: null,
    }
};

const entityReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_EXTERNAL_USER_LIST: return ({
            ...state,
            externalUsers: {
                ...action.payload,
                paginationToken: action.payload.paginationToken
                    ? action.payload.paginationToken[0] === null
                        ? action.payload.paginationToken
                        : [...state.externalUsers.paginationToken, action.payload.paginationToken]
                    : state.externalUsers.paginationToken
            }
        });
        case GET_EXTERNAL_USER_DETAILS: return ({
            ...state,
            userDetail: action.payload
        });
        case CREATE_EXTERNAL_USER: return ({
            ...state,
            createUser: action.payload
        });
        case ENABLE_EXTERNAL_USER: return ({
            ...state,
            enableUser: action.payload
        });
        case DISABLE_EXTERNAL_USER: return ({
            ...state,
            disableUser: action.payload
        });
        case EXTERNAL_RESET_PASSWORD: return ({
            ...state,
            internalResetPassword: action.payload
        });
        case GLOBAL_SIGNOUT_EXTERNAL_USER: return ({
            ...state,
            globalSignOutUser: action.payload
        });
        case UPDATE_EXTERNAL_USER: return ({
            ...state,
            updateUser: action.payload
        });
        case GET_EXTERNAL_USER_ENTITIES: return ({
            ...state,
            userEntities: action.payload
        });
        case EXTERNAL_UNLINK_ENTITY: return ({
            ...state,
            unlinkEntity: action.payload
        });
        case EXTERNAL_ADD_LINKED_ACCOUNTS: return ({
            ...state,
            addLinkedAccounts: action.payload
        });
        case EXTERNAL_USER_AUTH_EVENTS: return ({
            ...state,
            authEvents: action.payload
        });
        default: return (state);
    }
}

export default entityReducer;