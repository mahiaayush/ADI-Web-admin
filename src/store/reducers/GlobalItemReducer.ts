import {
    POST_GLOBAL_ITEMS_SUCCESS,
    POST_GLOBAL_ITEMS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    globalItem: {
      data: {},
    }
  };
  
  const globalItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case POST_GLOBAL_ITEMS_SUCCESS:
        return {
          ...state,
          globalItem: {
            ...state.globalItem,
            data: action.payload,
            success: true,
          },
          
        };
      case POST_GLOBAL_ITEMS_ERROR:
        return {
          ...state,
          globalItem: {
            ...state.globalItem,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default globalItemReducer;