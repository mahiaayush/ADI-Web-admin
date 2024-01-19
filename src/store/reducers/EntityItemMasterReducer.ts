import { GET_ENTITIES_ITEM_MASTER_SUCCESS, GET_ENTITIES_ITEM_MASTER_ERROR } from "../constants";

const initialState = {
  getEntityItemMasterResponse: {
    data: [],
  },
};

const EntityItemMasterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTITIES_ITEM_MASTER_SUCCESS:
      return {
        ...state,
        getEntityItemMasterResponse: {
          ...state.getEntityItemMasterResponse,
          data: action.payload,
          success: true,
        },
      };
    case GET_ENTITIES_ITEM_MASTER_ERROR:
      return {
        ...state,
        getEntityItemMasterResponse: {
          ...state.getEntityItemMasterResponse,
          data: action.payload,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default EntityItemMasterReducer;
