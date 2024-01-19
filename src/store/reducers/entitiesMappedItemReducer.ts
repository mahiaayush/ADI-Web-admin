import {
    GET_ENTITIES_MAPPED_ITEMS_SUCCESS,
    GET_ENTITIES_MAPPED_ITEMS_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    entityMappedItem: {
      data: {},
    }
  };
  
  const entityMappedItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ENTITIES_MAPPED_ITEMS_SUCCESS:
        return {
          ...state,
          entityMappedItem: {
            ...state.entityMappedItem,
            data: action.payload,
            success: true,
          },
          
        };
      case GET_ENTITIES_MAPPED_ITEMS_ERROR:
        return {
          ...state,
          entityMappedItem: {
            ...state.entityMappedItem,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default entityMappedItemReducer;