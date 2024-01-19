import {
    GET_ENTITY_ITEM_DETAILS_SUCCESS,
    GET_ENTITY_ITEM_DETAILS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    entityItemDetail: {
      data: {},
    }
  };
  
  const entityItemDetailReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ENTITY_ITEM_DETAILS_SUCCESS:
        return {
          ...state,
          entityItemDetail: {
            ...state.entityItemDetail,
            data: action.payload,
            success: true,
          },
          
        };
      case GET_ENTITY_ITEM_DETAILS_ERROR:
        return {
          ...state,
          entityItemDetail: {
            ...state.entityItemDetail,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityItemDetailReducer;