import {
    GET_COUNSELLOR_STATUS_DATA_SUCCESS,
    GET_COUNSELLOR_STATUS_DATA_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    counsellorStatusDataResponse: {
      data: {},
    },
  };
  
  const counsellorStatusDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_STATUS_DATA_SUCCESS:
        return {
          ...state,
          counsellorStatusDataResponse: {
            ...state.counsellorStatusDataResponse,
            data: action.payload,
            success: true,
          },
        };
      case GET_COUNSELLOR_STATUS_DATA_ERROR:
        return {
          ...state,
          counsellorStatusDataResponse: {
            ...state.counsellorStatusDataResponse,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default counsellorStatusDataReducer;