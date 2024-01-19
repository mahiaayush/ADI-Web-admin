import {
    GET_BANNER_SECTION_SUCCESS,
    GET_BANNER_SECTION_ERROR
} from "../constants";

const initialState = {
    bannerSectionResponse: {
        data: {},
    }
};

const BannerSectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BANNER_SECTION_SUCCESS:
            return {
                ...state,
                bannerSectionResponse: {
                    ...state.bannerSectionResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
        case GET_BANNER_SECTION_ERROR:
            return {
                ...state,
                bannerSectionResponse: {
                    ...state.bannerSectionResponse,
                    data: { rows: [] },
                    success: false,
                },
            };
        default:
            return state;
    }
}
export { BannerSectionReducer };