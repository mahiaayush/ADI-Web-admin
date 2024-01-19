import { POST_ENTITIES_MAP_ITEM_SUCCESS, POST_ENTITIES_MAP_ITEM_ERROR } from "../constants";

const initialState = {
  postEntityMapItemResponse: {
    data: [],
  },
};

const EntityMapItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_ENTITIES_MAP_ITEM_SUCCESS:
      return {
        ...state,
        postEntityMapItemResponse: {
          ...state.postEntityMapItemResponse,
          data: action.payload,
          success: true,
        },
      };
    case POST_ENTITIES_MAP_ITEM_ERROR:
      return {
        ...state,
        postEntityMapItemResponse: {
          ...state.postEntityMapItemResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default EntityMapItemReducer;
