import {
  GET_AFFILITION_MASTER_SUCCESS,
  GET_AFFILITION_MASTER_ERROR
  
  } from "../constants";

  const initialState = {
    affilitionMasterResponse: {
      data: {},
    }
  };
  
  const AffilitionMasterReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_AFFILITION_MASTER_SUCCESS:
        return {
          ...state,
          affilitionMasterResponse: {
            ...state.affilitionMasterResponse,
            data: action.payload.data,
            success: true,
          },
        };
      case GET_AFFILITION_MASTER_ERROR:
        return {
          ...state,
          affilitionMasterResponse: {
            ...state.affilitionMasterResponse,
            data: action.payload.data,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default AffilitionMasterReducer;