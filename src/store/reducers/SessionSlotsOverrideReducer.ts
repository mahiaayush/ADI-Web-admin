import { GET_SESSION_SLOTS_OVERRIDE_LISTING_SUCCESS, GET_SESSION_SLOTS_OVERRIDE_LISTING_ERROR } from "../constants";

const initialState = {
  sessionSlotsOverrideListingResponse: {
    data: {},
  },
};

const sessionSlotsOverrideListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSION_SLOTS_OVERRIDE_LISTING_SUCCESS:
      return {
        ...state,
        sessionSlotsOverrideListingResponse: {
          ...state.sessionSlotsOverrideListingResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_SESSION_SLOTS_OVERRIDE_LISTING_ERROR:
      return {
        ...state,
        sessionSlotsOverrideListingResponse: {
          ...state.sessionSlotsOverrideListingResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default sessionSlotsOverrideListingReducer;
