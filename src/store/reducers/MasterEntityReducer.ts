import {
  GET_MASTER_ENTITY_LIST_SUCCESS,
  GET_MASTER_ENTITY_LIST_ERROR,
  GET_MASTER_ENTITY_COLLEGE_LIST_SUCCESS,
  GET_MASTER_ENTITY_COLLEGE_LIST_ERROR

} from "../constants";

const CollegeEntityListState = {
  collegeEntityListResponse: {
    data: {},

  }
};

const CollegeEntityListReducer = (state = CollegeEntityListState, action) => {
  switch (action.type) {
    case GET_MASTER_ENTITY_COLLEGE_LIST_SUCCESS:
      return {
        ...state,
        collegeEntityListResponse: {
          ...state.collegeEntityListResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_MASTER_ENTITY_COLLEGE_LIST_ERROR:
      return {
        ...state,
        collegeEntityListResponse: {
          ...state.collegeEntityListResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};

const initialState = {
  masterEntityResponse: {
    data: {},

  }
};

const MasterEntityListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MASTER_ENTITY_LIST_SUCCESS:
      return {
        ...state,
        masterEntityResponse: {
          ...state.masterEntityResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_MASTER_ENTITY_LIST_ERROR:
      return {
        ...state,
        masterEntityResponse: {
          ...state.masterEntityResponse,
          data: action.payload.data,
          success: false,
        },
      };
    default:
      return state;
  }
};
export {
  MasterEntityListReducer,
  CollegeEntityListReducer
}  