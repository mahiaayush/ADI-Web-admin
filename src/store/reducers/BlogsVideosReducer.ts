import {
    GET_BLOGSVIDEOS_SUCCESS,
    GET_BLOGSVIDEOS_ERROR,
} from "../constants";

const BlogsVideosState = {
    blogsVideosResponse: {
        data: {},
    }
};

const BlogsVideosReducer = (state = BlogsVideosState, action) => {
    switch (action.type) {
        case GET_BLOGSVIDEOS_SUCCESS:
            return {
                ...state,
                blogsVideosResponse: {
                    ...state.blogsVideosResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_BLOGSVIDEOS_ERROR:
            return {
                ...state,
                blogsVideosResponse: {
                    ...state.blogsVideosResponse,
                    data: action.payload.data,
                    success: false,
                },
            };
        default:
            return state;
    }
};

export {
    BlogsVideosReducer
}
