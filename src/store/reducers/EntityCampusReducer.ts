import {
  GET_ENTITYCAMPUS_SUCCESS,
  GET_ENTITYCAMPUS_ERROR,
} from "../constants";

const initialState = {
  entitycampusResponse: {
    data: {},
  }
};

const EntityCampusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ENTITYCAMPUS_SUCCESS:
      return {
        ...state,
        entitycampusResponse: {
          ...state.entitycampusResponse,
          data: action.payload.data,
          success: true,
        },
      };
    case GET_ENTITYCAMPUS_ERROR:
      return {
        ...state,
        entitycampusResponse: {
          ...state.entitycampusResponse,
          data: { rows: [] },
          success: false,
        },
      };
    default:
      return state;
  }
};
export default EntityCampusReducer;