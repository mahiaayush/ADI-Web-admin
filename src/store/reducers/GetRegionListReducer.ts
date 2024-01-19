import { GET_REGION_LIST_SUCCESS, GET_REGION_LIST_ERROR } from "../constants";

const initialState = {
  getRegionListResponse: {
    data: [],
  },
};

const GetRegionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REGION_LIST_SUCCESS:
      return {
        ...state,
        getRegionListResponse: {
          ...state.getRegionListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_REGION_LIST_ERROR:
      return {
        ...state,
        getRegionListResponse: {
          ...state.getRegionListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetRegionListReducer;
