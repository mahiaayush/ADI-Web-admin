import {
  ADMIN_UPDATE_ICSC_STATUS,
  ADMIN_UPDATE_ICSC_STATUS_SUCCESS,
  ADMIN_UPDATE_ICSC_STATUS_ERROR,
} from "src/store/constants";

const initialState = {
  approveActionResponse: {
    data: {},
  }
};

const DetailScreenReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_ICSC_STATUS_SUCCESS:
      return {
        ...state,
        approveActionResponse: {
          ...state.approveActionResponse,
          data: action.payload,
          success: true,
        },
      };
    case ADMIN_UPDATE_ICSC_STATUS_ERROR:
      return {
        ...state,
        approveActionResponse: {
          ...state.approveActionResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default DetailScreenReducer;
