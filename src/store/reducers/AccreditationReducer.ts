import {
  GET_ACCREDITATION_SUCCESS,
  GET_ACCREDITATION_ERROR,
} from "../constants";

const initialState = {
  accreditationResponse: {
    data: {},
  }
};

const AccreditationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACCREDITATION_SUCCESS:
      return {
        ...state,
        accreditationResponse: {
          ...state.accreditationResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACCREDITATION_ERROR:
      return {
        ...state,
        accreditationResponse: {
          ...state.accreditationResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default AccreditationReducer;