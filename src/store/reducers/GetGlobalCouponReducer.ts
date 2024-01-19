import {
  GET_GLOBAL_COUPON_SUCCESS,
  GET_GLOBAL_COUPON_ERROR,
  GET_COUPON_DETAIL_SUCCESS,
  GET_COUPON_DETAIL_ERROR,
  CLEAR_COUPON_DETAIL,
} from "../constants";

const initialState = {
  getGlobalCouponResponse: {
    data: [],
    success: false
  },
  getCouponDetailResponse: {
    data: {},
    success: false
  },
};

const GetGlobalCouponReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_GLOBAL_COUPON_SUCCESS:
      return {
        ...state,
        getGlobalCouponResponse: {
          ...state.getGlobalCouponResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_GLOBAL_COUPON_ERROR:
      return {
        ...state,
        getGlobalCouponResponse: {
          ...state.getGlobalCouponResponse,
          data: action.payload,
          success: false,
        },
      };
    case GET_COUPON_DETAIL_SUCCESS:
      return {
        ...state,
        getCouponDetailResponse: {
          ...state.getCouponDetailResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_COUPON_DETAIL_ERROR:
      return {
        ...state,
        getCouponDetailResponse: {
          ...state.getCouponDetailResponse,
          data: action.payload,
          success: false,
        },
      };
    case CLEAR_COUPON_DETAIL:
      return {
        ...state,
        getCouponDetailResponse: initialState.getCouponDetailResponse,
      };
    default:
      return state;
  }
};
export default GetGlobalCouponReducer;
