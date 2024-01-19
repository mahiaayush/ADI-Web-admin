import {
    GET_COUNSELLOR_AVAILABILITY_SUCCESS,
    GET_COUNSELLOR_AVAILABILITY_ERROR,
  } from "src/store/constants";
  
  const initialState = {
    counsellorAvailability: {
      data: {},
    }
  };
  
  const counsellorAvailabilityReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COUNSELLOR_AVAILABILITY_SUCCESS:
        return {
          ...state,
          counsellorAvailability: {
            ...state.counsellorAvailability,
            data: action.payload,
            success: true,
          },
          
        };
      case GET_COUNSELLOR_AVAILABILITY_ERROR:
        return {
          ...state,
          counsellorAvailability: {
            ...state.counsellorAvailability,
            data: action.payload,
            success: false,
          },
        };
      default:
        return state;
    }
  };
  export default counsellorAvailabilityReducer;