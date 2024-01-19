import { GET_PT_OFFERINGS_SUCCESS, GET_PT_OFFERINGS_ERROR } from "../constants";

const initialState = {
  GetPlatformOfferingResponse: {
    data: [],
  },
};

const GetPlatformOfferingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PT_OFFERINGS_SUCCESS:
      return {
        ...state,
        GetPlatformOfferingResponse: {
          ...state.GetPlatformOfferingResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_PT_OFFERINGS_ERROR:
      return {
        ...state,
        GetPlatformOfferingResponse: {
          ...state.GetPlatformOfferingResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetPlatformOfferingReducer;
