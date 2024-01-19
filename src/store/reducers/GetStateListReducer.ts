import { GET_STATE_LIST_SUCCESS, GET_STATE_LIST_ERROR } from "../constants";

const initialState = {
  getStateListResponse: {
    data: [],
  },
};

const GetStateListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STATE_LIST_SUCCESS:
      return {
        ...state,
        getStateListResponse: {
          ...state.getStateListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_STATE_LIST_ERROR:
      return {
        ...state,
        getStateListResponse: {
          ...state.getStateListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetStateListReducer;
