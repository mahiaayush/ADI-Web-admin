import { GET_SESSION_LISTING_SUCCESS, GET_SESSION_LISTING_ERROR } from "../constants";

const initialState = {
  sessionListingResponse: {
    data: [],
  },
};

const sessionListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSION_LISTING_SUCCESS:
      return {
        ...state,
        sessionListingResponse: {
          ...state.sessionListingResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_SESSION_LISTING_ERROR:
      return {
        ...state,
        sessionListingResponse: {
          ...state.sessionListingResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default sessionListingReducer;
