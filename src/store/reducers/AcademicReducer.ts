import {
  GET_ACADEMIC_SUCCESS,
  GET_ACADEMIC_ERROR,
  GET_PROGRAM_LIST_SUCCESS,
  GET_PROGRAM_LIST_ERROR,
  GET_PROGRAMLEVEL_LIST_SUCCESS,
  GET_PROGRAMLEVEL_LIST_ERROR
} from "../constants";

const initialState = {
  academicResponse: {
    data: {},
  }
};

const AcademicReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACADEMIC_SUCCESS:
      return {
        ...state,
        academicResponse: {
          ...state.academicResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ACADEMIC_ERROR:
      return {
        ...state,
        academicResponse: {
          ...state.academicResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};

const ProgramListState = {
  ProgramListResponse: {
    data: {},
  }
};

const ProgramListReducer = (state = ProgramListState, action) => {
  switch (action.type) {
    case GET_PROGRAM_LIST_SUCCESS:
      return {
        ...state,
        ProgramListResponse: {
          ...state.ProgramListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_PROGRAM_LIST_ERROR:
      return {
        ...state,
        ProgramListResponse: {
          ...state.ProgramListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
const ProgramLevelListState = {
  ProgramLevelListResponse: {
    data: {},
  }
};

const ProgramLevelListReducer = (state = ProgramLevelListState, action) => {
  switch (action.type) {
    case GET_PROGRAMLEVEL_LIST_SUCCESS:
      return {
        ...state,
        ProgramLevelListResponse: {
          ...state.ProgramLevelListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_PROGRAMLEVEL_LIST_ERROR:
      return {
        ...state,
        ProgramLevelListResponse: {
          ...state.ProgramLevelListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};

export {
  AcademicReducer,
  ProgramListReducer,
  ProgramLevelListReducer
}  