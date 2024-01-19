import {
    GET_TESTIMONIAL_SUCCESS,
    GET_TESTIMONIAL_ERROR
} from "../constants";

const initialState = {
    testimonialResponse: {
        data: {},
    }
};

const TestimonialReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TESTIMONIAL_SUCCESS:
            return {
                ...state,
                testimonialResponse: {
                    ...state.testimonialResponse,
                    data: action.payload.data,
                    success: true,
                },
            };
            case GET_TESTIMONIAL_ERROR:
                return {
                  ...state,
                  testimonialResponse: {
                    ...state.testimonialResponse,
                    data: { rows: [] },
                    success: false,
                  },
                };
              default:
                return state;
    }
}
export { TestimonialReducer };