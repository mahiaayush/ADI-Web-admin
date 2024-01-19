import {
  GET_SECTION_CONTENT_SUCCESS,
  GET_SECTION_CONTENT_ERROR,
  POST_SECTION_CONTENT_ERROR,
  POST_SECTION_CONTENT_SUCCESS,
  PUT_SECTION_CONTENT_SUCCESS,
  PUT_SECTION_CONTENT_ERROR
} from "../constants";

const initialState = {
  SectionContentResponse: {
    data: {},
  }
};

const getSectionContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SECTION_CONTENT_SUCCESS:
      return {
        ...state,
        SectionContentResponse: {
          ...state.SectionContentResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_SECTION_CONTENT_ERROR:
      return {
        ...state,
        SectionContentResponse: {
          ...state.SectionContentResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
const postSectionContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_SECTION_CONTENT_SUCCESS:
      return {
        ...state,
        SectionContentResponse: {
          ...state.SectionContentResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case POST_SECTION_CONTENT_ERROR:
      return {
        ...state,
        collegeMasterResponse: {
          ...state.SectionContentResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

const putSectionContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUT_SECTION_CONTENT_SUCCESS:
      return {
        ...state,
        SectionContentResponse: {
          ...state.SectionContentResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case PUT_SECTION_CONTENT_ERROR:
      return {
        ...state,
        SectionContentResponse: {
          ...state.SectionContentResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
}

//
export { getSectionContentReducer, postSectionContentReducer, putSectionContentReducer };