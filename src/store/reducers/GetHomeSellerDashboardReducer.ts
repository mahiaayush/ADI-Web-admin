import { GET_SELLER_DASHBOARD_SUCCESS, GET_SELLER_DASHBOARD_ERROR } from "../constants";

const initialState = {
    getHomeSellerDashboardResponse: {
    data: [],
  },
};

const GetHomeSellerDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELLER_DASHBOARD_SUCCESS:
      return {
        ...state,
        getHomeSellerDashboardResponse: {
          ...state.getHomeSellerDashboardResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_SELLER_DASHBOARD_ERROR:
      return {
        ...state,
        getHomeSellerDashboardResponse: {
          ...state.getHomeSellerDashboardResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetHomeSellerDashboardReducer;
