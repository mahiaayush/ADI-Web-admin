import { GET_VPA_LIST_SUCCESS, GET_VPA_LIST_ERROR } from "../constants";

const initialState = {
  getVpaListResponse: {
    data: [],
  },
};

const GetVpaListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VPA_LIST_SUCCESS:
      return {
        ...state,
        getVpaListResponse: {
          ...state.getVpaListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_VPA_LIST_ERROR:
      return {
        ...state,
        getVpaListResponse: {
          ...state.getVpaListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetVpaListReducer;
