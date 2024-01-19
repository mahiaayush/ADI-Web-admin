import {
  GET_CHANGE_COUNSELLOR_SUCCESS,
  GET_CHANGE_COUNSELLOR_ERROR,
} from "src/store/constants";

const initialState = {
  getChangeCounsellorListResponse: {
    data: {},
  },
};

const GetChangeCounsellorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHANGE_COUNSELLOR_SUCCESS:
      return {
        ...state,
        getChangeCounsellorListResponse: {
          ...state.getChangeCounsellorListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_CHANGE_COUNSELLOR_ERROR:
      return {
        ...state,
        getChangeCounsellorListResponse: {
          ...state.getChangeCounsellorListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetChangeCounsellorListReducer;
