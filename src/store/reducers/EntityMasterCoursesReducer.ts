import {
  GET_MASTERENTITY_SUCCESS,
  GET_MASTERENTITY_ERROR,
  GET_ENTITYTYPE_LIST_SUCCESS,
  GET_ENTITYTYPE_LIST_ERROR,
} from "../constants";

const ListState = {
  entityTypeListResponse: {
    data: {},
  }
};

const EntityTypeListReducer = (state = ListState, action) => {
  switch (action.type) {
    case GET_ENTITYTYPE_LIST_SUCCESS:
      return {
        ...state,
        entityTypeListResponse: {
          ...state.entityTypeListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ENTITYTYPE_LIST_ERROR:
      return {
        ...state,
        entityTypeListResponse: {
          ...state.entityTypeListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  entitycoursesResponse: {
    data: {},
  }
};

const EntityMasterCoursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASTERENTITY_SUCCESS:
      return {
        ...state,
        entitycoursesResponse: {
          ...state.entitycoursesResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_MASTERENTITY_ERROR:
      return {
        ...state,
        entitycoursesResponse: {
          ...state.entitycoursesResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  EntityMasterCoursesReducer,
  EntityTypeListReducer
}