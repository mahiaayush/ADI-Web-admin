import {
  GET_PROGRAM_SUCCESS,
  GET_PROGRAM_ERROR,
  GET_INTAKE_LIST_SUCCESS,
  GET_INTAKE_LIST_ERROR,
} from "../constants";

const initialState = {
  programResponse: {
    data: {},
  }
};
const IntakeListState = {
  IntakeListResponse: {
    data: {},
  }
};

const IntakeListReducer = (state = IntakeListState, action) => {
  switch (action.type) {
    case GET_INTAKE_LIST_SUCCESS:
      return {
        ...state,
        IntakeListResponse: {
          ...state.IntakeListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_INTAKE_LIST_ERROR:
      return {
        ...state,
        IntakeListResponse: {
          ...state.IntakeListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};

const ProgramReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROGRAM_SUCCESS:
      return {
        ...state,
        programResponse: {
          ...state.programResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_PROGRAM_ERROR:
      return {
        ...state,
        programResponse: {
          ...state.programResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  ProgramReducer,
  IntakeListReducer
}