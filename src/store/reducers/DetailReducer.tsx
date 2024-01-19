import {
  GET_COUNSELLOR_API_DATA_SUCCESS,
  GET_COUNSELLOR_API_DATA_ERROR,
} from "src/store/constants";

const initialState = {
  DetailActionResponse: {
    data: {},
  },
};

const DetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNSELLOR_API_DATA_SUCCESS:
      return {
        ...state,
        DetailActionResponse: {
          ...state.DetailActionResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_COUNSELLOR_API_DATA_ERROR:
      return {
        ...state,
        DetailActionResponse: {
          ...state.DetailActionResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default DetailReducer;
