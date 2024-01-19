import {
  GET_CATAGORY_SUCCESS,
  GET_CATAGORY_ERROR,
  POST_CATAGORY_SUCCESS,
  POST_CATAGORY_ERROR,
  PUT_CATAGORY_SUCCESS,
  PUT_CATAGORY_ERROR
} from "../constants";

const initialState = {
  CatagoryResponse: {
    data: {},
  }
};

const getCatagoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATAGORY_SUCCESS:
      return {
        ...state,
        CatagoryResponse: {
          ...state.CatagoryResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_CATAGORY_ERROR:
      return {
        ...state,
        CatagoryResponse: {
          ...state.CatagoryResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postCatagoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_CATAGORY_SUCCESS:
      return {
        ...state,
        CatagoryResponse: {
          ...state.CatagoryResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_CATAGORY_ERROR:
      return {
        ...state,
        CatagoryResponse: {
          ...state.CatagoryResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putCatagoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_CATAGORY_SUCCESS:
      return {
        ...state,
        CatagoryResponse: {
          ...state.CatagoryResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_CATAGORY_ERROR:
      return {
        ...state,
        CatagoryResponse: {
          ...state.CatagoryResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}
//
export { getCatagoryReducer, postCatagoryReducer, putCatagoryReducer };