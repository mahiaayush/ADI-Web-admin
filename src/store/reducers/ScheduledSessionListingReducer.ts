import { GET_SCHEDULED_SESSION_LISTING_SUCCESS, GET_SCHEDULED_SESSION_LISTING_ERROR } from "../constants";

const initialState = {
  scheduledSessionListingResponse: {
    data: [],
  },
};

const scheduledSessionListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SCHEDULED_SESSION_LISTING_SUCCESS:
      return {
        ...state,
        scheduledSessionListingResponse: {
          ...state.scheduledSessionListingResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_SCHEDULED_SESSION_LISTING_ERROR:
      return {
        ...state,
        scheduledSessionListingResponse: {
          ...state.scheduledSessionListingResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default scheduledSessionListingReducer;
