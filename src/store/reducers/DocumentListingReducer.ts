import { GET_DOCUMENT_LIST_SUCCESS, GET_DOCUMENT_LIST_ERROR } from "../constants";

const initialState = {
  docListResponse: {
    data: [],
  },
};

const DocumentListingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENT_LIST_SUCCESS:
      return {
        ...state,
        docListResponse: {
          ...state.docListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_DOCUMENT_LIST_ERROR:
      return {
        ...state,
        docListResponse: {
          ...state.docListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export default DocumentListingReducer;
