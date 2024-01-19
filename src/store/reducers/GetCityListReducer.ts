import { GET_CITY_LIST_SUCCESS, GET_CITY_LIST_ERROR } from "../constants";

const initialState = {
  getCityListResponse: {
    data: [],
  },
};

const GetCityListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITY_LIST_SUCCESS:
      return {
        ...state,
        getCityListResponse: {
          ...state.getCityListResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_CITY_LIST_ERROR:
      return {
        ...state,
        getCityListResponse: {
          ...state.getCityListResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetCityListReducer;
