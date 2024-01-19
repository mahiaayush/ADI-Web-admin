import { GET_PERSONIFY_CSP_SUCCESS, GET_PERSONIFY_CSP_ERROR } from "../constants";

const initialState = {
  getPersonifyCspResponse: {
    data: [],
  },
};

const GetPersonifyCspReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PERSONIFY_CSP_SUCCESS:
      return {
        ...state,
        getPersonifyCspResponse: {
          ...state.getPersonifyCspResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_PERSONIFY_CSP_ERROR:
      return {
        ...state,
        getPersonifyCspResponse: {
          ...state.getPersonifyCspResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default GetPersonifyCspReducer;
